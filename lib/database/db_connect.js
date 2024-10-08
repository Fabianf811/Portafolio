"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require("pg");
require('dotenv').config();

// Verificamos si estamos en producción
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: isProduction ? process.env.POSTGRES_URL : undefined,
  host: isProduction ? undefined : process.env.DB_DEV_HOST,
  user: isProduction ? undefined : process.env.DB_DEV_USER,
  password: isProduction ? undefined : process.env.DB_DEV_PASSWORD || '',
  database: isProduction ? undefined : process.env.DB_DEV_NAME,
  port: isProduction ? undefined : parseInt(`${process.env.DB_DEV_PORT}`),
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  idleTimeoutMillis: 3000,  // Tiempo de inactividad antes de cerrar la conexión
});

exports.default = pool;
