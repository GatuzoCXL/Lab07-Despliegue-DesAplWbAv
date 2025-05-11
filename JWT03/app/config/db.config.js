export default {
  HOST: process.env.DB_HOST || "127.0.0.1",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "Losgatos@VM96ml", 
  DB: process.env.DB_NAME || "db",
  PORT: process.env.DB_PORT || 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};