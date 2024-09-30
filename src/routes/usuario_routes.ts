import { Router } from "express";
import { createUser, generateToken } from "../controllers/user_controller";

export const usuariosRoutes = Router();
usuariosRoutes.post('/api/login', generateToken);
usuariosRoutes.post('/user/register', createUser);
