import axios from "axios";

// URL base de nuestro API para autenticación
const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/auth/` : "http://localhost:3000/api/auth/";

class AuthService {
  // Método para iniciar sesión
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        // Si la respuesta contiene un token de acceso, guardamos el usuario en localStorage
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        return response.data;
      });
  }

  // Método para cerrar sesión
  logout() {
    // Eliminamos el usuario del localStorage
    localStorage.removeItem("user");
  }

  // Método para registrar un nuevo usuario
  register(username, email, password, roles = ["user"]) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      roles
    });
  }

  // Método para obtener el usuario actual desde localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

// Crear una instancia nombrada antes de exportarla
const authService = new AuthService();
export default authService;