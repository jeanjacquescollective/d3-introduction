// heatMap.js

// Function to create a heatmap
export default function createHeatMap(selector, width, height, mqttTopic, barColor) {
    let data = [
        [32.53, 56.22, 89.67, 23.23, 95.8, 43.65, 52.31, 83.68, 35.27, 5.01], [88.64, 40.57, 61.7, 29.8, 61.64, 38.1, 93.04, 28.85, 34.95, 37.96], [8.81, 23.0, 92.54, 79.46, 76.61, 28.09, 32.24, 88.8, 83.05, 41.87], [50.04, 28.6, 57.69, 24.09, 98.39, 44.45, 10.39, 94.51, 44.84, 24.08], [79.02, 94.64, 74.13, 8.37, 90.91, 75.02, 1.43, 31.95, 61.82, 47.55], [29.14, 94.41, 84.05, 0.19, 55.56, 1.19, 88.8, 31.87, 97.61, 18.66], [80.53, 83.22, 14.18, 95.68, 85.27, 93.82, 14.0, 16.45, 59.26, 70.23], [94.7, 53.98, 81.34, 57.42, 26.94, 59.72, 75.7, 33.98, 63.67, 9.52], [97.76, 47.33, 52.7, 16.23, 56.2, 44.39, 76.65, 47.24, 38.91, 15.97], [95.37, 16.85, 37.76, 37.92, 2.9, 45.81, 8.8, 78.35, 67.16, 50.36]]
        ;
    const tooltip = d3.select(".tooltip");
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(d3.range(data[0].length))
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, innerHeight]);

    const xAxis = d3.axisBottom(xScale)
        .tickFormat((d, i) => `Col ${i + 1}`);

    const yAxis = d3.axisLeft(yScale)
        .tickFormat((d, i) => `Row ${i + 1}`);

    svg.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    const rows = data.length;
    const cols = data[0].length;
    const cellWidth = innerWidth / cols;
    const cellHeight = innerHeight / rows;

    // Use the existing colorScale defined outside the function
    const colorScale = d3.scaleSequential(d3.interpolateInferno)
        .domain([0, 100]);
    svg.selectAll("rect")
        .data(data.flat())
        .enter().append("rect")
        .attr("x", (d, i) => (i % cols) * cellWidth)
        .attr("y", (d, i) => Math.floor(i / cols) * cellHeight)
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("fill", d => colorScale(d));

    // Function to update the heatmap with new data
    function updateChart(newData) {
        // newData = Object.values(newData);
        const rows = newData.length;
        const cols = newData[0].length;
        const rects = svg.selectAll("rect")
            .data(newData.flat());

        rects.enter().append("rect")
            .merge(rects)
            .transition()
            .duration(750)
            .attr("x", (d, i) => (i % cols) * cellWidth)
            .attr("y", (d, i) => Math.floor(i / cols) * cellHeight)
            .attr("width", cellWidth)
            .attr("height", cellHeight)
            .attr("fill", d => colorScale(d));

        rects.exit().remove();

    }
    return { svg, updateChart };
}

