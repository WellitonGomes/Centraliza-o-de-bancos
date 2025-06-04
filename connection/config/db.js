const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

console.log(client);
console.log('Senha:', process.env.DB_PASS);

async function connectDB() {
    try {
        await client.connect();
        console.log('🚀 Conectado ao PostgreSQL');

        const res = await client.query('SELECT version()');
        console.log('Versão do PostgreSQL:', res.rows[0].version);
    } catch (err) {
        console.error('Erro na conexão:', err);
        process.exit(1);
    }
}

module.exports = { client, connectDB };
