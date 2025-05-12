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
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3001",  // Usa la variable de entorno o fallback a localhost:3001
    "https://jwt-auth-frontend.onrender.com" // URL donde se desplegará el frontend en Render
  ],
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
async function initial() {
  console.log("Inicializando roles en la base de datos...");
  
  try {
    // Comprobar si ya existen roles
    const count = await Role.count();
    if (count > 0) {
      console.log("Roles ya existentes en la base de datos. No es necesario crearlos.");
      return;
    }

    // Crear roles si no existen
    await Role.create({
      id: 1,
      name: "user"
    });
    console.log("Rol 'user' añadido a la base de datos");

    await Role.create({
      id: 2,
      name: "moderator"
    });
    console.log("Rol 'moderator' añadido a la base de datos");

    await Role.create({
      id: 3,
      name: "admin"
    });
    console.log("Rol 'admin' añadido a la base de datos");
    
    console.log("Todos los roles han sido creados correctamente");
  } catch (err) {
    console.error("Error al crear roles:", err.message);
  }
}

// Sincroniza los modelos con la base de datos e inicializa los roles
// En producción, no queremos recrear las tablas cada vez
const forceSync = process.env.NODE_ENV === 'production' ? false : true;

console.log("=== Configuración de la base de datos ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Force Sync:", forceSync);
console.log("======================================");

db.sequelize.sync({ force: forceSync }).then(() => {
  console.log("Base de datos sincronizada y tablas creadas");
  
  // En un entorno de producción nuevo, también queremos inicializar los roles
  // Para un despliegue académico, aseguramos que los roles existan
  if (forceSync || process.env.NODE_ENV === 'production') {
    initial();
  }
  
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}.`);
  });
}).catch(err => {
  console.error("Error al conectar con la base de datos:", err);
});