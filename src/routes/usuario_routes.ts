import { Router } from "express";
import { createUser, deleteUsuarios, generateToken, getUsuarios, } from "../controllers/user_controller";
import { autenticateToken } from "../Middleware/authorization";


export const usuariosRoutes = Router();
usuariosRoutes.post('/api/login', generateToken);
usuariosRoutes.post('/user/register', createUser);
usuariosRoutes.get('/usuarios', getUsuarios);
usuariosRoutes.delete('/deleteUsuarios/:id', deleteUsuarios);