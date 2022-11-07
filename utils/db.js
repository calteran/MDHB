import {Sequelize} from "sequelize";

export async function select(query) {
    const sequelize = new Sequelize({
        dialect: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        logging: false
    });

    return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
}
