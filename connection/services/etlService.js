const { client } = require('../config/db');
const { buscarTodosDados } = require('../services/sqlServerService');

async function inserirLeitura(leitura) {
    const sql = `
        INSERT INTO public."LeituraEnergia"
        ("idUsinaReferente", "leituraInicial", "dataLeituraInicial", 
         "leituraFinal", "dataLeituraFinal")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const valores = [
        leitura.idUsinaReferente,
        leitura.leituraInicial,
        leitura.dataLeituraInicial,
        leitura.leituraFinal,
        leitura.dataLeituraFinal
    ];

    try {
        const res = await client.query(sql, valores);
        console.log('✅ Registro inserido:');
        console.table([res.rows[0]]);
    } catch (err) {
        console.error('❌ Erro ao inserir:', err);
    }
}

async function executarETL() {
    try {
        const resultados = await buscarTodosDados();
        console.log('🔍 Resultados obtidos:', resultados);

        for (const item of resultados) {
            const leitura = {
                idUsinaReferente: parseInt(item.idUsinaReferente),
                leituraInicial: item.dados.primeiraLeitura.Valor,
                dataLeituraInicial: item.dados.primeiraLeitura.Data,
                leituraFinal: item.dados.ultimaLeitura.Valor,
                dataLeituraFinal: item.dados.ultimaLeitura.Data
            };
            await inserirLeitura(leitura);
        }

        console.log('✅ Todos os dados foram inseridos com sucesso.');

    } catch (error) {
        console.error('❌ Erro na ETL:', error);
    }
}

module.exports = { executarETL };
