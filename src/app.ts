import express, { Router } from "express";
import { errorHandler } from "./Middleware/error";
import { clientesRoutes } from "./routes/clientes_routes";
import { usuariosRoutes } from "./routes/usuario_routes";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(errorHandler);
app.use(clientesRoutes);
app.use(usuariosRoutes);

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`) 
});
