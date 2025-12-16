import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../atoms/Input.jsx";
import Button from "../atoms/Button.jsx";
import Card from "../atoms/Card.jsx";
import { login } from "../services/authService.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(correo, password);
      if (correo.endsWith("@admin.cl")) {
        window.location.href = "/admin";
      } else {
        navigate("/");
      }
    } catch (err) {
      const status = err?.response?.status;
      let message = "No se pudo iniciar sesión.";
      if (status === 401) message = "Credenciales inválidas.";
      else if (status === 400) message = "Datos inválidos. Verifica el correo y la contraseña.";
      else if (status === 404) message = "Usuario no encontrado.";
      alert(message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Card style={{ maxWidth: "420px" }}>
        <form onSubmit={onSubmit}>
          <Input
            label="Correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="usuario@duoc.cl o admin@admin.cl"
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" style={{ width: "100%" }}>Entrar</Button>
        </form>
      </Card>
    </div>
  );
}
