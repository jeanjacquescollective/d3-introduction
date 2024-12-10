export default function createBarChart(selector, width, height, mqttTopic, barColor) {
    const tooltip = d3.select(".tooltip")
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().range([0, innerWidth]).padding(0.1);
    const yScale = d3.scaleLinear().range([innerHeight, 0]);

    const xAxisGroup = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${innerHeight})`);

    const yAxisGroup = svg.append("g")
        .attr("class", "y axis");



    const data = []; // Holds temperature values
    function updateChart(message) {
            const temperature = parseFloat(message.toString());
            data.push(temperature);
            if (data.length > 10) data.shift(); // Max 10 points

            xScale.domain(data.map((_, i) => i));
            yScale.domain([0, d3.max(data)]);

            // Update axes
            xAxisGroup.transition().call(d3.axisBottom(xScale));
            yAxisGroup.transition().call(d3.axisLeft(yScale));

            // Bind data to bars
            const bars = svg.selectAll("rect").data(data);

            bars.enter()
                .append("rect")
                .attr("class", "bar")
                .merge(bars)
                .transition()
                .duration(500)
                .attr("x", (_, i) => xScale(i))
                .attr("width", xScale.bandwidth())
                .attr("y", d => yScale(d))
                .attr("height", d => innerHeight - yScale(d))
                .attr("fill", barColor);

            svg.selectAll(".bar")
                .on("mouseover", (event, d) => {
                    let label;
                    switch (mqttTopic) {
                        case 'channel/temperature':
                            label = `Temperatuur: ${d}°C`;
                            break;
                        case 'channel/pressure':
                            label = `Druk: ${d} hPa`;
                            break;
                        case 'channel/humidity':
                            label = `Vochtigheid: ${d}%`;
                            break;
                        default:
                            label = `Waarde: ${d}`;
                    }
                    tooltip.style("visibility", "visible")
                        .text(label);
                })
                .on("mousemove", event => {
                    tooltip.style("top", `${event.pageY - 10}px`)
                        .style("left", `${event.pageX + 10}px`);
                })
                .on("mouseout", () => tooltip.style("visibility", "hidden"));

            bars.exit().remove();
        }
    return {
       svg, updateChart
    };
}
