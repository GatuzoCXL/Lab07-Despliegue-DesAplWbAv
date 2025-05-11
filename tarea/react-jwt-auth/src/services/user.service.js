import axios from "axios";
import authHeader from "./auth-header";

// URL base para los endpoints de prueba
const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/test/` : "http://localhost:3000/api/test/";

class UserService {
  // Método para obtener contenido público (accesible sin autenticación)
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  // Método para obtener contenido para usuarios autenticados
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  // Método para obtener contenido para moderadores
  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  // Método para obtener contenido para administradores
  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

// Crear una instancia nombrada antes de exportarla
const userService = new UserService();
export default userService;