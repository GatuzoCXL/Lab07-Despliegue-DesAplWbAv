// Importa dotenv para cargar variables de entorno
import dotenv from "dotenv";
dotenv.config();

// Importa Express para crear la aplicación web
import express from "express";

// Importa CORS para permitir solicitudes desde otros dominios (por ejemplo, desde el frontend)
import cors from "cors";

// Importa los modelos y configuración de Sequelize (ORM para la base de datos)
import db from "./app/models/index.js";

// Importa las rutas de autenticación (signup, signin)
import authRoutes from "./app/routes/auth.routes.js";

// Importa las rutas protegidas por roles de usuario
import userRoutes from "./app/routes/user.routes.js";

// Referencias a los modelos Role y User
const Role = db.role;

// Crea una instancia de la aplicación Express
const app = express();

// Configura las opciones de CORS para permitir acceso desde el frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3001",  // Usa la variable de entorno o fallback a localhost:3001
  credentials: true  // Para permitir cookies en las solicitudes cross-origin si es necesario
};

// Aplica el middleware de CORS a la aplicación
app.use(cors(corsOptions));

// Middleware para analizar solicitudes con cuerpo en formato JSON
app.use(express.json());

// Middleware para analizar solicitudes con cuerpo en formato URL-encoded (formularios)
app.use(express.urlencoded({ extended: true }));

// Ruta simple para probar que el servidor está funcionando
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Node.js JWT Authentication API." });
});

// Define la ruta base para autenticación: /api/auth/signup y /api/auth/signin
app.use("/api/auth", authRoutes);

// Define la ruta base para pruebas de acceso según el rol del usuario: /api/test/*
app.use("/api/test", userRoutes);

// Define el puerto en el que se ejecutará el servidor. Usa el puerto de la variable de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Función para inicializar los roles en la base de datos
function initial() {
  console.log("Inicializando roles en la base de datos...");
  
  Role.create({
    id: 1,
    name: "user"
  }).then(() => {
    console.log("Rol 'user' añadido a la base de datos");
  }).catch(err => {
    console.log("Error al crear rol 'user':", err.message);
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  }).then(() => {
    console.log("Rol 'moderator' añadido a la base de datos");
  }).catch(err => {
    console.log("Error al crear rol 'moderator':", err.message);
  });
 
  Role.create({
    id: 3,
    name: "admin"
  }).then(() => {
    console.log("Rol 'admin' añadido a la base de datos");
  }).catch(err => {
    console.log("Error al crear rol 'admin':", err.message);
  });
}

// Sincroniza los modelos con la base de datos e inicializa los roles
// En producción, no queremos recrear las tablas cada vez
const forceSync = process.env.NODE_ENV === 'production' ? false : true;

db.sequelize.sync({ force: forceSync }).then(() => {
  console.log("Base de datos sincronizada y tablas creadas");
  
  // Llamamos a la función para inicializar los roles solo si estamos recreando las tablas
  if (forceSync) {
    initial();
  }
  
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}.`);
  });
});