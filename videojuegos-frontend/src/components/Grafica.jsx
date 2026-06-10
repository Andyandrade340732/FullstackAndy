import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grafica = () => {
  const juegos = useSelector((state) => state.juegosSlice);

  const datosPorAnio = juegos.reduce((acumulador, juego) => {
    const anio = juego.anioLanzamiento || "Sin año";
    if (acumulador[anio]) {
      acumulador[anio] = acumulador[anio] + 1;
    } else {
      acumulador[anio] = 1;
    }
    return acumulador;
  }, {});

  const etiquetas = Object.keys(datosPorAnio);
  const cantidades = Object.values(datosPorAnio);

  const data = {
    labels: etiquetas,
    datasets: [
      {
        label: "Juegos por año",
        data: cantidades,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h3>Juegos por año de lanzamiento</h3>
      <Bar data={data} />
    </div>
  );
};

export default Grafica;