require('dotenv').config({ path: 'config/config.env' });

// cli config

module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.PSQL_HOST,
        dialect: process.env.SEQUALIZE_DIALECT
    },
    test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.PSQL_HOST,
        dialect: process.env.SEQUALIZE_DIALECT
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.PSQL_HOST,
        dialect: process.env.SEQUALIZE_DIALECT
    }
};