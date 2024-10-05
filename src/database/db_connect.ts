import {Pool} from "pg";
require('dotenv').config();

let pool: Pool;

if (process.env.PRODUCTION) {
    pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
    });
} else {
    pool = new Pool({
        host: process.env.DB_DEV_HOST,
        user: process.env.DB_DEV_USER,
        password: '',
        database: process.env.DB_DEV_NAME,
        port: parseInt(`${process.env.DB_DEV_PORT}`),
        idleTimeoutMillis: 3000,
    });
}

export default pool;
