import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

export const sequelize = new Sequelize({
  dialect: "mssql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: true,
  dialectOptions: {
    authentication: {
      type: "default", // 👈 força SQL Server Authentication
      options: {
        userName: process.env.DB_USER,
        password: process.env.DB_PASS,
      },
    },
    options: {
      encrypt: false, // Habilitar SSL se necessário
      trustServerCertificate: true, // Para conexões locais
    },
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw new Error("❌ Database connection failed: " + error);
  }
};

//sequelize.addModels([Customers]);
