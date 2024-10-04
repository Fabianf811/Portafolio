"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarios = exports.createUser = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_connect_1 = __importDefault(require("../database/db_connect"));
const generateToken = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.nombre_usuario;
    const password = req.body.password;
    const user = { name: userName };
    const query = yield db_connect_1.default.query('SELECT * FROM usuarios WHERE nombre_usuario = $1 AND password = $2', [userName, password]);
    if (query.rowCount !== null && query.rowCount > 0) {
        const accesToken = jsonwebtoken_1.default.sign(user, `${process.env.CLAVE_JWT}`, { expiresIn: '1h' });
        return response.status(200).json({ accesToken });
    }
    else {
        return response.status(400).json('User Not Found');
    }
});
exports.generateToken = generateToken;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_usuario, email, password } = req.body;
    if (nombre_usuario !== null && email !== null && password !== null) {
        try {
            yield db_connect_1.default.query('INSERT INTO usuarios (nombre_usuario, email, password) values ($1, $2, $3)', [nombre_usuario, email, password]);
            return res.status(201).json({
                message: 'User Created',
                usuario: {
                    nombre_usuario,
                    email
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    }
    else {
        return res.status(400).json('Daño en el servidor');
    }
});
exports.createUser = createUser;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM usuarios;');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUsuarios = getUsuarios;
