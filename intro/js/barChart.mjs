export default function barChart(selector, data){
    // Dataset

// SVG-afmetingen
const width = 500;
const height = 300;
const margin = { top: 20, right: 20, bottom: 50, left: 50 };

// Maak SVG canvas
const svgBar = d3.select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Schalen
const xScale = d3.scaleBand()
    .domain(data.map((_, i) => i))
    .range([margin.left, width - margin.right])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - margin.bottom, margin.top]);

// Voeg assen toe
svgBar.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat(d => `Item ${d + 1}`));

svgBar.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

// Staafdiagram
svgBar.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (_, i) => xScale(i))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d));

// Tooltip
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

// Interactiviteit
svgBar.selectAll(".bar")
    .on("mouseover", function (event, d) {
        tooltip.style("visibility", "visible").text(`Waarde: ${d}`);
        d3.select(this).attr("fill", "orange");
    })
    .on("mousemove", function (event) {
        tooltip.style("top", `${event.pageY - 10}px`)
            .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("fill", "steelblue");
    });


}