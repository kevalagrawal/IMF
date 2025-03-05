const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    }
);

// Test connection
sequelize.authenticate()
    .then(() => console.log('🔥 PostgreSQL Connected'))
    .catch(err => console.error('❌ PostgreSQL Connection Error:', err));

module.exports = sequelize;
