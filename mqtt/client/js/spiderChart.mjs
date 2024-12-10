// spiderChart.js

// Function to create a spider chart
export default function createSpiderChart(selector, width, height, mqttTopic, color) {
    const tooltip = d3.select(".tooltip");
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Set up the SVG element
    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${innerWidth / 2 + margin.left}, ${innerHeight / 2 + margin.top})`);

    // Set up the radius and angle
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const angleSlice = Math.PI * 2 / 3; // 3 categories

    // Set up the scales
    const rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 100]);

    // Set up the radar line
    const radarLine = d3.lineRadial()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice);

    // Function to update the chart with new data
    function updateChart(data) {
        const categories = Object.keys(data).map((key, i) => ({
            axis: key,
            value: data[key]
        }));

        // Bind data to the radar line
        const radarWrapper = svg.selectAll(".radarWrapper")
            .data([categories]);

        // Enter new elements
        radarWrapper.enter()
            .append("path")
            .attr("class", "radarWrapper")
            .merge(radarWrapper)
            .attr("d", radarLine)
            .style("fill", color)
            .style("fill-opacity", 0.5)
            .style("stroke", color)
            .style("stroke-width", 2);

        // Remove old elements
        radarWrapper.exit().remove();
    }

    return {
        svg, updateChart
    };
    
}
