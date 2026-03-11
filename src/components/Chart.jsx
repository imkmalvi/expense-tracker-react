import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { categories } from "../constants/categories";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ expenses }) => {

const [legendPosition, setLegendPosition] = useState("right");

useEffect(() => {

const handleResize = () => {
  if (window.innerWidth < 1024) {
    setLegendPosition("bottom");
  } else {
    setLegendPosition("right");
  }
};

handleResize();

window.addEventListener("resize", handleResize);

return () => window.removeEventListener("resize", handleResize);

}, []);

const categoryTotals = {};

expenses.forEach((item) => {
categoryTotals[item.category] =
(categoryTotals[item.category] || 0) + item.amount;
});

const categoryColorMap = Object.fromEntries(
categories.map((c) => [c.name, c.color])
);

const data = {
labels: Object.keys(categoryTotals),
datasets: [
{
label: "Expenses",
data: Object.values(categoryTotals),

    backgroundColor: Object.keys(categoryTotals).map(
      (cat) => categoryColorMap[cat]
    ),

    borderColor: Object.keys(categoryTotals).map(
      (cat) => categoryColorMap[cat]
    ),

    borderWidth: 2,
    hoverOffset: 8
  }
]

};

return ( <div className="flex flex-col items-center">

  <Typography variant="h6" className="mb-8">
    Expense Chart
  </Typography>

  {expenses.length > 0 ? (

    <div className="w-full max-w-[440px] h-[320px] mx-auto mt-4">

      <Pie
        data={data}
        options={{
          maintainAspectRatio: false,

          layout: {
          padding: {
            right: 40,
            bottom: 20
            }
          },
          
          plugins: {
            legend: {
              position: legendPosition,
              labels: {
                font: {
                  size: 16,
                  weight: "bold",
                  family: "Inter, Poppins, sans-serif"
                },
                padding: 18
                }
            }
          }
        }}
      />

    </div>

  ) : (

    <Typography color="text.secondary">
      No data
    </Typography>

  )}

</div>


);
};

export default Chart;
