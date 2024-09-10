import express, { Router } from "express";
import { getClientes, getClientesById } from "./controllers/clientes_controller";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const clientesRoutes = Router();

clientesRoutes.get('/clientes', getClientes);
clientesRoutes.get('/clientes/:id', getClientesById);

app.use(clientesRoutes);

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`) 
});
