const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://konovalov:1a2s3d4f@democluster.mreugv5.mongodb.net/?appName=DemoCluster");
        console.log('Соединение с MongoDB установлено');
    } catch (error) {
        console.error('Ошибка соедениения с MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;