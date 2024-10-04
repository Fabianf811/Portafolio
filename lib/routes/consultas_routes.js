"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultasRoutes = void 0;
const express_1 = require("express");
const consultas_controllers_1 = require("../controllers/consultas_controllers");
exports.consultasRoutes = (0, express_1.Router)();
exports.consultasRoutes.post('/createConsulta', consultas_controllers_1.createConsultas);
