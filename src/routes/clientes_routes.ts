import { Router } from "express";
import { autenticateToken } from "../Middleware/authorization";
import { createClienteConsulta, createClientes, deleteClientes, getClientes, getClientesById, updateClientes, getConsultas, getClienteConsulta } from "../controllers/clientes_controller";

export const clientesRoutes = Router();

clientesRoutes.get('/clientes', getClientes);
clientesRoutes.get('/clientes/:id', getClientesById);
clientesRoutes.post('/createClientes',createClientes);
clientesRoutes.delete('/deleteClientes/:id', deleteClientes);
clientesRoutes.put('/updateClientes/:id', updateClientes);
// Ruta para crear cliente y consulta
clientesRoutes.post('/createClienteConsulta', createClienteConsulta);
clientesRoutes.get('/getClienteConsulta', getClienteConsulta);

clientesRoutes.get('/consultas',getConsultas);


export { createClienteConsulta };

