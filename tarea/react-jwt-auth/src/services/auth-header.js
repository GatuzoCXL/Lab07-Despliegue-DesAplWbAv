// Función para generar el header de autorización con el token JWT
export default function authHeader() {
  // Obtenemos el usuario almacenado en localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Si existe el usuario y tiene un accessToken, lo incluimos en el header
  if (user && user.accessToken) {
    // Para Spring Boot back-end
    // return { Authorization: "Bearer " + user.accessToken };
    
    // Para Node.js Express back-end
    return { "x-access-token": user.accessToken };
  } else {
    // Si no hay usuario autenticado, retornamos un objeto vacío
    return {};
  }
}