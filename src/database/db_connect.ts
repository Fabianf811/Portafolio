import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool;

if (process.env.PRODUCTION) {
    if (!process.env.POSTGRES_URL) {
        throw new Error("Missing POSTGRES_URL for production environment");
    }
    pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
    });
} else {
    if (!process.env.DB_DEV_HOST || !process.env.DB_DEV_USER || !process.env.DB_DEV_PASSWORD || !process.env.DB_DEV_NAME || !process.env.DB_DEV_PORT) {
        throw new Error("Missing required environment variables for development");
    }
    pool = new Pool({
        host: process.env.DB_DEV_HOST,
        user: process.env.DB_DEV_USER,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_NAME,
        port: parseInt(`${process.env.DB_DEV_PORT}`),
        idleTimeoutMillis: 3000,
    });
}

export default pool;
