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
exports.getConsultas = exports.createClienteConsulta = exports.updateClientes = exports.deleteClientes = exports.createClientes = exports.getClientesById = exports.getClientes = void 0;
const db_connect_1 = __importDefault(require("../database/db_connect"));
/**
 * Get all Data of Clientes Table
 * @param req
 * @param res
 * @returns Clientes
 */
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM clientes;');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getClientes = getClientes;
/**
 * Get all Data of Clientes Table by id
 * @param req
 * @param res
 * @returns Clientes by id
 */
const getClientesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM clientes WHERE id_cliente = $1', [id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getClientesById = getClientesById;
/**
 * Post all Data for Create Cliente
 * @param req
 * @param res
 * @returns Create Clientes
 */
const createClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, email, telefono, empresa, cargo } = req.body;
    if (nombre !== null && apellido !== null && email !== null && telefono !== null && empresa !== null && cargo) {
        try {
            yield db_connect_1.default.query('INSERT INTO clientes (nombre, apellido, email, telefono, empresa, cargo) values ($1, $2, $3, $4, $5, $6)', [nombre, apellido, email, telefono, empresa, cargo]);
            return res.status(201).json({
                message: 'Client created succesfully',
                cliente: {
                    nombre,
                    apellido,
                    email,
                    telefono,
                    empresa,
                    cargo
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    }
    else {
        return res.status(500).json('Daño en el servidor');
    }
});
exports.createClientes = createClientes;
/**
 * Delete Clientes by id
 * @param req
 * @param res
 * @returns Delete Clientes
 */
const deleteClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield db_connect_1.default.query('DELETE FROM clientes WHERE id_cliente = $1', [id]);
        return res.status(200).json(`The cliente ${id} delete succesfully.`);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.deleteClientes = deleteClientes;
/**
 * Cliente Update by Id
 * @param req
 * @param res
 * @returns
 */
const updateClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nombre, apellido, email, telefono, empresa, cargo } = req.body;
    try {
        yield db_connect_1.default.query('UPDATE clientes SET nombre = $1, apellido = $2, email = $3, telefono = $4, empresa = $5, cargo = $6 WHERE id_cliente = $7', [nombre, apellido, email, telefono, empresa, cargo, id]);
        return res.json({
            message: 'Cliente Succesfully Update',
            cliente: {
                nombre,
                apellido,
                email,
                telefono,
                empresa,
                cargo
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.updateClientes = updateClientes;
/**
 * Create cliente y consulta
 * @param req
 * @param res
 * @returns
 */
const createClienteConsulta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, email, telefono, empresa, cargo, servicio, consulta } = req.body;
    if (!nombre || !apellido || !email || !telefono || !empresa || !cargo || !servicio || !consulta) {
        return res.status(400).json('Todos los campos son requeridos.');
    }
    const client = yield db_connect_1.default.connect();
    try {
        yield client.query('BEGIN');
        // Inserta el cliente en la tabla 'clientes' y devuelve el 'id_cliente'
        const clienteResult = yield client.query('INSERT INTO clientes (nombre, apellido, email, telefono, empresa, cargo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_cliente', [nombre, apellido, email, telefono, empresa, cargo]);
        const id_cliente = clienteResult.rows[0].id_cliente;
        // Inserta la consulta en la tabla 'consultas' vinculada con 'cliente_id'
        yield client.query('INSERT INTO consultas (servicio, consulta, cliente_id) VALUES ($1, $2, $3)', [servicio, consulta, id_cliente]);
        yield client.query('COMMIT');
        return res.status(201).json({
            message: 'Cliente y consulta creados exitosamente',
            cliente: {
                id_cliente,
                nombre,
                apellido,
                email,
                telefono,
                empresa,
                cargo
            },
            consulta: {
                servicio,
                consulta,
                cliente_id: id_cliente
            }
        });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
    finally {
        client.release();
    }
});
exports.createClienteConsulta = createClienteConsulta;
const getConsultas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM consultas;');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getConsultas = getConsultas;
