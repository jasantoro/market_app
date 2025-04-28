import React, { useEffect, useState } from "react";
import { User } from "../models";
import InputField from "../components/InputField";

interface ProfileProps {
  user: User | null;
  onUserUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUserUpdate }) => {
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setForm({ name: parsed.name, email: parsed.email });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const updated = { ...user, ...form };
    fetch("http://localhost:4000/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      onUserUpdate(updated);
    });
  };

  if (!user) return <div className="p-6">Cargando perfil...</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="text"
          name="name"
          label="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
        />
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
