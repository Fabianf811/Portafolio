import express, { Router } from "express";
import pool from "./database/db_connect";
import { getClientes } from "./controllers/clientes_controller";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const clientesRoutes = Router();

clientesRoutes.get('/clientes', getClientes);

/*app.get('/', async (req, res) => {
    const query = 'select * from clientes;';
    const response = await pool.query(query);
    console.log(response);
    res.send('Hola Mundo - Soy Fabian Fernandez');
}); */

app.use(clientesRoutes);

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`) 
});
