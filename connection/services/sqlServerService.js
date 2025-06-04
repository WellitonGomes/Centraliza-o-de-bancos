// buscarTodos.js

const bancos = require('../Log/databaseCredentials.json');
const buscarDadosBanco = require('../routes/sqlRoutes.js');
const { getYesterdayDate } = require('../utils/functionYesterday.js');

async function buscarTodosDados() {
    const dataConsulta = getYesterdayDate();
    const consultas = [];

    if (Array.isArray(bancos)) {
        for (const item of bancos) {
            const nome = Object.keys(item)[0];
            const config = item[nome];
            const idUsinaReferente = config.idUsinaReferente || null;  // pega o idUsina se tiver

            const consulta = buscarDadosBanco(nome, config, dataConsulta)
                .then(resultado => ({
                    nomeUsina: nome,
                    idUsinaReferente: idUsinaReferente,
                    dados: resultado
                }));

            consultas.push(consulta);
        }
    } else {
        for (const [nome, config] of Object.entries(bancos)) {
            const idUsinaReferente = config.idUsinaReferente || null;

            const consulta = buscarDadosBanco(nome, config, dataConsulta)
                .then(resultado => ({
                    nomeUsina: nome,
                    idUsinaReferente: idUsinaReferente,
                    dados: resultado
                }));

            consultas.push(consulta);
        }
    }

    const resultados = await Promise.all(consultas);
    return resultados;
}


// Aqui mantemos a função para a rota
async function buscarTodos(req, res) {
    try {
        const resultados = await buscarTodosDados();
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { buscarTodos, buscarTodosDados };
