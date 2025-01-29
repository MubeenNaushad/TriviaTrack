import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const PieChartComponent = ({ progressData }) => {
  const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Green, Yellow, Red

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl">
      <h3 className="text-xl font-bold mb-4 text-center">📊 Course Progress</h3>
      <PieChart width={350} height={350}>
        <Pie
          data={progressData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          isAnimationActive={true} // Enable Animation
          animationDuration={1000} // Animation Speed in ms
          animationEasing="ease-out" // Smooth easing effect
        >
          {progressData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className="transition-transform duration-500 ease-in-out hover:scale-105"
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
