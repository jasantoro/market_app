import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Metric } from "../../models";
import InputField from "../../components/InputField";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Metrics() {
  const [metrics, setMetrics] = useState<Metric | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchMetrics = () => {
    let url = "http://localhost:4000/api/metrics";
    const params = [];
    if (from) params.push(`from=${from}`);
    if (to) params.push(`to=${to}`);
    if (params.length) url += `?${params.join("&")}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMetrics(data));
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (!metrics)
    return <div style={{ padding: "2em" }}>Cargando métricas...</div>;

  const chartData = {
    labels: metrics.topProducts.map((p) => p.name),
    datasets: [
      {
        label: "Cantidad Vendida",
        data: metrics.topProducts.map((p) => p.count),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Metrics</h2>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <InputField
          type="date"
          name="from"
          label="Desde"
          value={from}
          full={false}
          onChange={(e) => setFrom(e.target.value)}
        />
        <InputField
          type="date"
          name="to"
          label="Hasta"
          value={to}
          full={false}
          onChange={(e) => setTo(e.target.value)}
        />
        <button
          onClick={fetchMetrics}
          className="mb-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Filtrar
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <p>
          <strong>Total de pedidos:</strong> {metrics.totalOrders}
        </p>
        <p>
          <strong>Total vendido:</strong> ${metrics.totalRevenue.toFixed(2)}
        </p>
      </div>
      <div className="max-w-xl my-6">
        <Bar data={chartData} />
      </div>
      <h3 className="text-xl font-semibold mt-6">Usuarios más compradores</h3>
      <ul className="list-disc pl-6">
        {metrics.topBuyers.map((u: any, i: number) => (
          <li key={i}>
            {u.email} - {u.count} pedidos - ${u.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </>
  );
}
