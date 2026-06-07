import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginApi } from "../services/apiServices.js";
import { jwtDecode } from "jwt-decode";
import { loginRedux } from "../redux/features/authSlice.js";
import { startLoading, stopLoading } from "../redux/features/loadingSlice.js";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(3, "La contraseña debe tener al menos 3 caracteres")
    .required("La contraseña es obligatoria"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorLogin, setErrorLogin] = useState("");

  const onSubmit = async (values) => {
    try {
      setErrorLogin("");
      dispatch(startLoading());
      const respuesta = await loginApi(values.email, values.password);
      const tokenString = respuesta.token;
      localStorage.setItem("token", tokenString);
      const decoded = jwtDecode(tokenString);
      dispatch(loginRedux({ usuario: decoded, token: tokenString }));
      navigate("/");
    } catch (error) {
      setErrorLogin(error.message || "Error al iniciar sesión");
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "350px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">🎮 Videojuegos</h4>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form>
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

                {errorLogin && (
                  <div className="alert alert-danger py-2 mb-3">
                    {errorLogin}
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button className="btn btn-dark" type="submit" disabled={!values.email || !values.password}>
                    Ingresar
                  </button>
                  <button className="btn btn-outline-dark" type="button" onClick={() => navigate("/register")}>
                    Registrarse
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

export default Login;