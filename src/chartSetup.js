import {
  Chart,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,   // ⬅ MUST BE IMPORTED
} from "chart.js";

// Register everything
Chart.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler // ⬅ MUST BE REGISTERED
);
