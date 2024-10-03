import { Router } from "express";
import { createConsultas } from "../controllers/consultas_controllers";


export const consultasRoutes = Router();

consultasRoutes.post('/createConsulta',createConsultas);

