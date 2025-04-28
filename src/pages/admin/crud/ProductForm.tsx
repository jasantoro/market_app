import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../models";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({ name: "", price: "", type: "" });

  const handleBack = () => {
    navigate(-1); // 👈 Volver a la página anterior
  };

  useEffect(() => {
    console.log(id);
    if (isEditing) {
      fetch(`http://localhost:4000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = { ...form, price: parseFloat(form.price) };
    if (isEditing) {
      await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    } else {
      await fetch(`http://localhost:4000/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    }

    navigate("/admin/products");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Editar Producto" : "Nuevo Producto"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="text"
          name="name"
          label="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <InputField
          type="number"
          name="price"
          label="Precio"
          value={form.price}
          onChange={handleChange}
          required
        />
        <SelectField
          name="type"
          label="Seleccioná una categoría"
          value={form.type}
          onChange={handleChange}
          required
          options={[
            { key: "fruta", value: "Fruta" },
            { key: "verdura", value: "Verdura" },
          ]}
        />
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Cancelar
          </button>
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

export default ProductForm;
