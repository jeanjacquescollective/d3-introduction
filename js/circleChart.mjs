export default function circleChart(selector, data) {
    const svg = d3.select(selector)
        .append("svg")
        .attr("width", 500)
        .attr("height", 300);

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => (i + 1) * 80) // Plaatsing
        .attr("cy", 150)
        .attr("r", d => d / 2) // Straal afhankelijk van data
        .attr("fill", "steelblue");

}
