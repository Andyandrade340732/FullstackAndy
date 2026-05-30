import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginApi } from "../services/apiServices.js";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/features/authSlice.js";

const Login = () => {
  const [password, setPassword] = useState("");
  const [deshabilitarSubmit, setDeshabilitarSubmit] = useState(true);
  const emailRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const texto = e.target.value;
    setPassword(texto);
    setDeshabilitarSubmit(texto.length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    try {
      const respuesta = await loginApi(email, password);
      const tokenString = respuesta.token;
      localStorage.setItem("token", tokenString);
      const decoded = jwtDecode(tokenString);
      dispatch(loginRedux({ usuario: decoded, token: tokenString }));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" ref={emailRef} />

      <label>Password</label>
      <input type="password" value={password} onChange={handleChange} />

      <button type="submit" disabled={deshabilitarSubmit}>
        Ingresar
      </button>
      <button type="button" onClick={() => navigate("/register")}>
        Registrarse
      </button>
    </form>
  );
};

export default Login;