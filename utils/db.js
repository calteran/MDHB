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

export async function db() {
    // export the database instance with defined models
    const sequelize = new Sequelize({
        dialect: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        logging: false
    });

    const Page = sequelize.define('pages', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        list_order: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });

    const Module = sequelize.define('modules', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        page_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Page,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        content: {
            type: Sequelize.TEXT,
        },
        list_order: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    // test the connection
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return {
        Pages: Page,
        Modules: Module,
        Users: User,
        sequelize
    };
}
