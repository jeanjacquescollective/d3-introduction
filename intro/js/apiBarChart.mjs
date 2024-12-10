export default function apiBarChart(selector, dataUrl) {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    // Create SVG canvas
    const svgBar = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            // Extract title lengths from the first 10 posts
            const titleLengths = data.slice(0, 10).map(post => post.title.length);

            // Define scales
            const xScale = d3.scaleBand()
                .domain(titleLengths.map((_, i) => i))
                .range([margin.left, width - margin.right])
                .padding(0.1);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(titleLengths)])
                .range([height - margin.bottom, margin.top]);

            // Add X axis
            svgBar.append("g")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).tickFormat(d => `Item ${d + 1}`));

            // Add Y axis
            svgBar.append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(yScale));

            // Create bars
            svgBar.selectAll(".bar")
                .data(titleLengths)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", (_, i) => xScale(i))
                .attr("y", d => yScale(d))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - margin.bottom - yScale(d));
        });
}
