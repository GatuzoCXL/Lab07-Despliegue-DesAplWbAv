import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    username: "",
    email: "",
    password: "",
    roles: [], // Nuevo campo para roles
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "El nombre de usuario debe tener entre 3 y 20 caracteres.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("¡Este campo es obligatorio!"),
    email: Yup.string()
      .email("Este no es un email válido.")
      .required("¡Este campo es obligatorio!"),
    password: Yup.string()
      .test(
        "len",
        "La contraseña debe tener entre 6 y 40 caracteres.",
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("¡Este campo es obligatorio!"),
  });

  const handleRegister = (formValue) => {
    const { username, email, password, roles } = formValue;
    
    // Si no se seleccionó ningún rol, usar "user" por defecto
    const selectedRoles = roles.length > 0 ? roles : ["user"];

    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, password, selectedRoles).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  
                  {/* Nueva sección para seleccionar roles */}
                  <div className="form-group">
                    <label>Roles</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="roleUser"
                        checked={values.roles.includes("user")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          let newRoles = [...values.roles];
                          if (isChecked) {
                            newRoles.push("user");
                          } else {
                            newRoles = newRoles.filter(role => role !== "user");
                          }
                          setFieldValue("roles", newRoles);
                        }}
                      />
                      <label className="form-check-label" htmlFor="roleUser">
                        Usuario
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="roleModerator"
                        checked={values.roles.includes("moderator")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          let newRoles = [...values.roles];
                          if (isChecked) {
                            newRoles.push("moderator");
                          } else {
                            newRoles = newRoles.filter(role => role !== "moderator");
                          }
                          setFieldValue("roles", newRoles);
                        }}
                      />
                      <label className="form-check-label" htmlFor="roleModerator">
                        Moderador
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="roleAdmin"
                        checked={values.roles.includes("admin")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          let newRoles = [...values.roles];
                          if (isChecked) {
                            newRoles.push("admin");
                          } else {
                            newRoles = newRoles.filter(role => role !== "admin");
                          }
                          setFieldValue("roles", newRoles);
                        }}
                      />
                      <label className="form-check-label" htmlFor="roleAdmin">
                        Administrador
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Registrar</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;