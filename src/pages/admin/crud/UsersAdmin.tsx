import React, { useEffect, useState } from "react";
import { User } from "../../../models";

interface UsersAdminProps {
  currentUser: User | null;
}

const UsersAdmin: React.FC<UsersAdminProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") return;
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [currentUser]);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="p-6 text-red-500 font-bold">
        Acceso restringido al administrador.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Administrar Usuarios</h2>
      </div>
      <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
        <thead>
          <tr className="text-left border-b border-gray-300 dark:border-gray-700">
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2 capitalize">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersAdmin;
