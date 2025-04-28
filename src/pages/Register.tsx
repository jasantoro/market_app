import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Error al registrarse");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="text"
          name="name"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          name="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
