const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();
app.use(express.json());

const gadgetRoutes = require('./routes/gadgetRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/gadgets', gadgetRoutes);
app.use('/auth', authRoutes);

sequelize.sync({ force: false }) 
    .then(() => {
        console.log("📦 Database synced");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => console.error("❌ Error syncing database:", err));
