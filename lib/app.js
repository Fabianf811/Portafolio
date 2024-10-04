"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = require("./Middleware/error");
const clientes_routes_1 = require("./routes/clientes_routes");
const usuario_routes_1 = require("./routes/usuario_routes");
const consultas_routes_1 = require("./routes/consultas_routes");
const clientes_routes_2 = require("./routes/clientes_routes");
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(error_1.errorHandler);
app.use(clientes_routes_1.clientesRoutes);
app.use(usuario_routes_1.usuariosRoutes);
app.use(consultas_routes_1.consultasRoutes);
app.use(clientes_routes_2.createClienteConsulta);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
