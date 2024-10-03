import express, { Router } from "express";
import { errorHandler } from "./Middleware/error";
import { clientesRoutes } from "./routes/clientes_routes";
import { usuariosRoutes } from "./routes/usuario_routes";
import { consultasRoutes } from "./routes/consultas_routes";
import { createClienteConsulta} from "./routes/clientes_routes";

import cors from "cors";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json())
app.use(errorHandler);
app.use(clientesRoutes);
app.use(usuariosRoutes);
app.use(consultasRoutes);
app.use(createClienteConsulta)

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`) 
});
