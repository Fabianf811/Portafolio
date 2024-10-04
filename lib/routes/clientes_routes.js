"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClienteConsulta = exports.clientesRoutes = void 0;
const express_1 = require("express");
const authorization_1 = require("../Middleware/authorization");
const clientes_controller_1 = require("../controllers/clientes_controller");
Object.defineProperty(exports, "createClienteConsulta", { enumerable: true, get: function () { return clientes_controller_1.createClienteConsulta; } });
exports.clientesRoutes = (0, express_1.Router)();
exports.clientesRoutes.get('/clientes', clientes_controller_1.getClientes);
exports.clientesRoutes.get('/clientes/:id', authorization_1.autenticateToken, clientes_controller_1.getClientesById);
exports.clientesRoutes.post('/createClientes', clientes_controller_1.createClientes);
exports.clientesRoutes.delete('/deleteClientes/:id', authorization_1.autenticateToken, clientes_controller_1.deleteClientes);
exports.clientesRoutes.put('/updateClientes/:id', clientes_controller_1.updateClientes);
// Ruta para crear cliente y consulta
exports.clientesRoutes.post('/createClienteConsulta', clientes_controller_1.createClienteConsulta);
exports.clientesRoutes.get('/consultas', clientes_controller_1.getConsultas);
