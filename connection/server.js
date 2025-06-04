require('dotenv').config();
const app = require('./app');
const { connectDB, client } = require('./config/db');
const { executarETL } = require('./services/etlService');

const PORT = process.env.APP_PORT || 3000;

(async () => {
    await connectDB();

    await executarETL();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

    process.on('SIGINT', async () => {
        console.log('🔌 Encerrando conexão PostgreSQL...');
        await client.end();
        process.exit();
    });

    console.log('🔚 ETL finalizado, 🔌 encerrando servidor...');

    // encerra conexão do DB e termina processo
    await client.end();
    process.exit(0);
})();
