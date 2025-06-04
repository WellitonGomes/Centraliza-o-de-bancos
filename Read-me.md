# Sincronizador de Geração Acumulada - SQL Server para PostgreSQL

## 🆘 Descrição

**Este projeto conecta a múltiplos bancos de dados SQL Server, executa a mesma consulta para extrair a primeira leitura de geração e a última, do dia anterior, e insere os resultados consolidados em um banco PostgreSQL centralizado, calculando a diferença entre estes dois valores para obter o acumulativo de energia.**

**⏱️ A rotina é executada automaticamente todos os dias às 9 da manhã, garantindo o armazenamento atualizado dos dados históricos de geração.**

# 🛠️ Funcionalidades

- 💾 Conecta a diversos servidores SQL Server simultaneamente;

- 🔍 Executa uma consulta padronizada para buscar o dado de geração acumulada do dia anterior;

- 🧮 Calcula a geração acumulada por diferença entre a primeira e última leitura do dia anterior **"feito pelo banco, não presente no código"**;

- 📥 Insere os dados coletados em um banco PostgreSQL centralizado;

- ⏱️ Automatização via node-cron para execução diária às 9h da manhã;

# 🤖Tecnologias Utilizadas
- 🟢⚡Node.js

- 🗄️mssql (driver SQL Server para Node.js)

- 🐘 pg (driver PostgreSQL para Node.js)

- ⏰ node-cron (agendamento de tarefas)

- 🔐 dotenv (variáveis de ambiente)

# ⚙️ Configuração
## 1. Variáveis de ambiente (.env) Configure as conexões para os bancos SQL Server e PostgreSQL. 

**Exemplo:**

## Servidor PostgreSQL central
        PG_USER=usuario_pg
        PG_PASSWORD=senha_pg
        PG_HOST=host_pg
        PG_PORT=5432
        PG_DATABASE=banco_pg

## 2. As conexões dos servidores SQL Server são realizadas através da leitura de um (.json)

**Exemplo:**

## Servidores SQL Server
    [
        {
            "nome-usina": {
                "user": "",
                "password": "",
                "database": "",
                "server": "",
                "dataTable": "",
                "varId": "",
                "varColumn": "",
                "dateColumn": "",
                "idUsinaReferente": "",
                "options": {
                    "encrypt": false,
                    "trustServerCertificate": true
                },
                "requestTimeout": 300000,
                "connectionTimeout": 30000
            }
        }
    ]

# 👆 Como usar
- Instalar as bibliotecas.

        - 🏢 mssql 
        
        - 🐘 pg 
        
        - ⏰ node-cron 
        
        - 🔐 dotenv

# ▶️ Como iniciar o programa
    - Abra o arquivo time.js no terminal e digite:
        - node time.js
        - Assim, o node-cron executará o código todos os dias às 9h.


# 🔄 Fluxo do código
- Conectar a todos os bancos SQL Server configurados;

- Para cada banco, executar a query que busca a primeira e última leitura de geração do dia anterior;

- Conectar ao banco PostgreSQL e inserir os dados consolidados;

- O banco faz o cálculo da diferença entre a primeira e a última leitura e salva o Acumulado de energia do dia