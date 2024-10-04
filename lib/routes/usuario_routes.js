"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
exports.usuariosRoutes = (0, express_1.Router)();
exports.usuariosRoutes.post('/api/login', user_controller_1.generateToken);
exports.usuariosRoutes.post('/user/register', user_controller_1.createUser);
exports.usuariosRoutes.get('/usuarios', user_controller_1.getUsuarios);
