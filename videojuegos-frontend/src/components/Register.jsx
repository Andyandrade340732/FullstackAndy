import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registrarUsuarioApi } from "../services/apiServices.js";
import { startLoading, stopLoading } from "../redux/features/loadingSlice.js";

const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .required("El usuario es obligatorio"),
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(3, "La contraseña debe tener al menos 3 caracteres")
    .required("La contraseña es obligatoria"),
  repetirPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Repetir contraseña es obligatorio"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorRegister, setErrorRegister] = useState("");

  const onSubmit = async (values) => {
    try {
      setErrorRegister("");
      dispatch(startLoading());
      await registrarUsuarioApi({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      navigate("/login");
    } catch (error) {
      setErrorRegister(error.message || "Error al registrarse");
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "350px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">🎮 Crear cuenta</h4>
          <Formik
            initialValues={{ username: "", email: "", password: "", repetirPassword: "" }}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <Field className="form-control" type="text" name="username" placeholder="Username" />
                  <div className="text-danger small">
                    <ErrorMessage name="username" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <Field className="form-control" type="email" name="email" placeholder="Email" />
                  <div className="text-danger small">
                    <ErrorMessage name="email" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <Field className="form-control" type="password" name="password" placeholder="Password" />
                  <div className="text-danger small">
                    <ErrorMessage name="password" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Repetir Password</label>
                  <Field className="form-control" type="password" name="repetirPassword" placeholder="Repetir Password" />
                  <div className="text-danger small">
                    <ErrorMessage name="repetirPassword" />
                  </div>
                </div>

                {errorRegister && (
                  <div className="alert alert-danger py-2 mb-3">
                    {errorRegister}
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button className="btn btn-dark" type="submit" disabled={!values.username || !values.email || !values.password || !values.repetirPassword}>
                    Registrarse
                  </button>
                  <button className="btn btn-outline-dark" type="button" onClick={() => navigate("/login")}>
                    Ya tengo cuenta
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;