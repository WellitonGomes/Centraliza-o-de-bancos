const cron = require('node-cron');
const { exec } = require('child_process');

console.log("Aguardando ansiosamente...")

cron.schedule('0 9 * * *', () => {
    console.log('Executando tarefa às 1h da manhã todo dia');

    console.log('Iniciando a execução do script...');

    exec('node ../connection/server.js', (error, stdout, stderr) => {
        console.log(typeof process.env.DB_PASS, process.env.DB_PASS);

        if (error) {
            console.error(`Erro ao executar: ${error.message}`);
            return;
        } else {
            console.log("tudo certo")
        }
        if (stderr) {
            console.error(`Erro no script: ${stderr}`);
            return;
        } else {
            console.log("tudo certo")
        }
        console.log(`Saída:\n${stdout}`);
        console.log('Execução do script finalizada!');
    });
});

