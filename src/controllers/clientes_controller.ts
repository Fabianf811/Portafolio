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

/**
 * Create cliente y consulta
 * @param req 
 * @param res 
 * @returns 
 */

export const createClienteConsulta = async (req: Request, res: Response): Promise<Response> => {
    const { nombre, apellido, email, telefono, empresa, cargo, servicio, consulta } = req.body;

    if (!nombre || !apellido || !email || !telefono || !empresa || !cargo || !servicio || !consulta) {
        return res.status(400).json('Todos los campos son requeridos.');
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Inserta el cliente en la tabla 'clientes' y devuelve el 'id_cliente'
        const clienteResult = await client.query(
            'INSERT INTO clientes (nombre, apellido, email, telefono, empresa, cargo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_cliente',
            [nombre, apellido, email, telefono, empresa, cargo]
        );
        const id_cliente = clienteResult.rows[0].id_cliente;

        // Inserta la consulta en la tabla 'consultas' vinculada con 'cliente_id'
        await client.query(
            'INSERT INTO consultas (servicio, consulta, cliente_id) VALUES ($1, $2, $3)',
            [servicio, consulta, id_cliente]
        );

        await client.query('COMMIT');

        return res.status(201).json({
            message: 'Cliente y consulta creados exitosamente',
            cliente: {
                id_cliente,
                nombre,
                apellido,
                email,
                telefono,
                empresa,
                cargo
            },
            consulta: {
                servicio,
                consulta,
                cliente_id: id_cliente
            }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    } finally {
        client.release();
    }
};


export const getClienteConsulta = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Consulta que une la tabla 'clientes' con 'consultas'
        const result = await pool.query(`
            SELECT c.id_cliente, c.nombre, c.apellido, c.email, c.telefono, c.empresa, c.cargo, con.servicio, con.consulta 
            FROM clientes c
            JOIN consultas con ON c.id_cliente = con.cliente_id
        `);

        // Devolver los resultados en formato JSON
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los clientes y consultas:', error);
        return res.status(500).json('Error interno del servidor');
    }
};



export const getConsultas = async (req: Request, res:Response): Promise<Response> =>{
    try {
        const response: QueryResult = await pool.query('SELECT * FROM consultas;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};
