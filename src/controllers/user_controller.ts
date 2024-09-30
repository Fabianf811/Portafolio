import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../database/db_connect";

export const generateToken = async (req: Request, response:Response): Promise<Response> => {
    const userName = req.body.nombre_usuario;
    const password = req.body.password;
    const user = {name: userName};
    const query = await pool.query('SELECT * FROM usuarios WHERE nombre_usuario = $1 AND password = $2', [userName, password]);
    if (query.rowCount !== null && query.rowCount > 0){
        const accesToken = jwt.sign(user, `${process.env.CLAVE_JWT}`, {expiresIn: '1h'});
        return response.status(200).json({accesToken});
    } else {
        return response.status(400).json('User Not Found');
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const {nombre_usuario, email, password} = req.body;
    if (nombre_usuario !== null &&  email !== null && password !== null){
        try {
            await pool.query('INSERT INTO usuarios (nombre_usuario, email, password) values ($1, $2, $3)',
                [nombre_usuario, email, password]
            );
            return res.status(201).json({
                message: 'User Created',
                usuario: {
                    nombre_usuario,
                    email 
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else {
        return res.status(400).json('Daño en el servidor');
    }
};
