import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Obtener contenido específico para moderadores
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent("Error: " + _content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardModerator;