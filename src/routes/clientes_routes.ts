import { Router } from "express";
import { autenticateToken } from "../Middleware/authorization";
import { createClientes, deleteClientes, getClientes, getClientesById, updateClientes } from "../controllers/clientes_controller";

export const clientesRoutes = Router();

clientesRoutes.get('/clientes',autenticateToken, getClientes);
clientesRoutes.get('/clientes/:id',autenticateToken, getClientesById);
clientesRoutes.post('/createClientes',autenticateToken, createClientes);
clientesRoutes.delete('/deleteClientes/:id',autenticateToken, deleteClientes);
clientesRoutes.put('/updateClientes/:id', updateClientes);

