import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
    <div style={{width: 700, height: 400}}>
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;
