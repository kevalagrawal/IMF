const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Required for Render's PostgreSQL
        }
    },
    logging: false,
});

// Test connection
sequelize.authenticate()
    .then(() => console.log('🔥 Connected to PostgreSQL on Render'))
    .catch(err => console.error('❌ PostgreSQL Connection Error:', err));

module.exports = sequelize;
