import { Query, QueryResult } from "pg";
import pool from "../database/db_connect";
import { Request, Response } from "express";

/**
 * Get all Data of Clientes Table
 * @param req  
 * @param res 
 * @returns Clientes 
 */
export const getClientes = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM clientes;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * Get all Data of Clientes Table by id
 * @param req 
 * @param res 
 * @returns Clientes by id
 */
export const getClientesById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try{
        const response: QueryResult = await pool.query('SELECT * FROM clientes WHERE id_cliente = $1', [id]);
        return res.json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * Post all Data for Create Cliente
 * @param req 
 * @param res 
 * @returns Create Clientes
 */

export const createClientes = async (req: Request, res: Response): Promise<Response> => {
    const {nombre, apellido, email, telefono, empresa, cargo} = req.body;

    if (nombre !== null && apellido !== null && email !== null && telefono !== null && empresa !== null && cargo){
        try {
            await pool.query('INSERT INTO clientes (nombre, apellido, email, telefono, empresa, cargo) values ($1, $2, $3, $4, $5, $6)',
                [nombre, apellido, email, telefono, empresa, cargo]
            );
            return res.status(201).json({
                message: 'Client created succesfully',
                cliente: {
                    nombre,
                    apellido,
                    email, 
                    telefono, 
                    empresa, 
                    cargo
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else {
        return res.status(500).json('Daño en el servidor');
    }
};

/**
 * Delete Clientes by id
 * @param req 
 * @param res 
 * @returns Delete Clientes 
 */
export const deleteClientes = async (req: Request, res: Response): Promise<Response> => {

    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM clientes WHERE id_cliente = $1', [id]);

        return res.status(200).json(`The cliente ${id} delete succesfully.`);
    }catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * Cliente Update by Id
 * @param req 
 * @param res 
 * @returns 
 */

export const updateClientes = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const {nombre, apellido, email, telefono, empresa, cargo } = req.body;

    try {
        await pool.query('UPDATE clientes SET nombre = $1, apellido = $2, email = $3, telefono = $4, empresa = $5, cargo = $6 WHERE id_cliente = $7',
            [nombre, apellido, email, telefono, empresa, cargo, id]
        );
        
        return res.json({
            message: 'Cliente Succesfully Update',
            cliente: {
                nombre,
                apellido,
                email,
                telefono,
                empresa,
                cargo
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};