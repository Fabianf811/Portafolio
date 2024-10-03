import { Query, QueryResult } from "pg";
import pool from "../database/db_connect";
import { Request, Response } from "express";

export const createConsultas = async (req: Request, res: Response): Promise<Response> => {
    const {servicio, consulta} = req.body;

    if (servicio !== null && consulta !== null){
        try {
            await pool.query('INSERT INTO consultas (servicio, consulta) values ($1, $2)',
                [servicio, consulta]
            );
            return res.status(201).json({
                message: 'Consult created succesfully',
                consulta: {
                    servicio,
                    consulta
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else {
        return res.status(400).json('Faltan datos en la solicitud');
    }
};
