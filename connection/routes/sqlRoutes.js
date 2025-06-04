const sql = require('mssql');

async function buscarDadosBanco(nome, config, dataConsulta) {
    const { user, password, database, server, options, requestTimeout, connectionTimeout, dataTable, varId, varColumn, dateColumn } = config;

    if (!server || typeof server !== 'string') {
        return {
            banco: nome,
            success: false,
            error: "Configuração inválida: 'server' ausente ou não é string."
        };
    }

    const sqlConfig = { user, password, database, server, options, requestTimeout, connectionTimeout };

    const dataInicio = `${dataConsulta}T00:00:00.000`;
    const dataFim = `${dataConsulta}T23:59:59.999`;

    let pool;

    try {
        pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();

        const varIdInt = parseInt(varId);
        if (isNaN(varIdInt)) {
            throw new Error(`varId inválido para banco ${nome}: ${varId}`);
        }

        const result = await pool.request()
            .input('varId', sql.Int, varIdInt)
            .input('dataInicio', sql.NVarChar, dataInicio)
            .input('dataFim', sql.NVarChar, dataFim)
            .query(`
                SELECT *
                FROM (
                    SELECT TOP 1 *
                    FROM ${dataTable}
                    WHERE ${varColumn} = @varId
                      AND ${dateColumn} >= CONVERT(datetime, @dataInicio, 126)
                      AND ${dateColumn} <= CONVERT(datetime, @dataFim, 126)
                    ORDER BY ${dateColumn} ASC
                ) AS PrimeiraLeitura

                UNION ALL

                SELECT *
                FROM (
                    SELECT TOP 1 *
                    FROM ${dataTable}
                    WHERE ${varColumn} = @varId
                      AND ${dateColumn} >= CONVERT(datetime, @dataInicio, 126)
                      AND ${dateColumn} <= CONVERT(datetime, @dataFim, 126)
                    ORDER BY ${dateColumn} DESC
                ) AS UltimaLeitura
            `);

        return {
            banco: nome,
            dataTable,
            varId: varIdInt,
            success: true,
            primeiraLeitura: result.recordset[0] || null,
            ultimaLeitura: result.recordset[1] || null
        };
    } catch (error) {
        return { banco: nome, success: false, error: error.message };
    } finally {
        if (pool) await pool.close();
    }
}

module.exports = buscarDadosBanco;
