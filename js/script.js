import apiBarChart from "./apiBarChart.mjs";
import barChart from "./barChart.mjs";
import circleChart from "./circleChart.mjs";

 circleChart("#circleChart", [10, 20, 30, 40, 50]);
 barChart("#barChart",  [50, 70, 90, 30, 60]);
 apiBarChart("#apiBarChart", "https://jsonplaceholder.typicode.com/posts");