import createBarChart from "./barChart.mjs";
import createHeatMap from "./heatMap.mjs";
import createSpiderChart from "./spiderChart.mjs";

connectToBroker(['channel/temperature', 'channel/pressure', 'channel/humidity', 'channel/comparative_categories', 'channel/heatmap']);
// Example usage:
const temperatureChart = createBarChart("#temperatureChart", 600, 300, 'channel/temperature', 'steelblue');
const pressureChart = createBarChart("#pressureChart", 600, 300, 'channel/pressure', 'green');
const humidityChart = createBarChart("#humidityChart", 600, 300, 'channel/humidity', 'orange');
const radarChart = createSpiderChart("#radarChart", 600, 600, 'channel/comparative_categories', 'red');
const heatMap = createHeatMap("#heatMap", 600, 300, 'channel/heatmap', 'blue');

function connectToBroker(topics) {

    // Connect to MQTT
    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');
    client.on('connect', () => {
        topics.forEach(topic => {
            client.subscribe(topic, function (err) {
                if (!err) {
                    console.log(`Subscribed to ${topic}`);
                }
            });
            console.log(`Subscribed to ${topic}`);
        });
    });

    client.on('message', (topic, message) => {
        if (topic === "channel/temperature") {
            console.log(`Received message on ${topic}: ${message}`);
            temperatureChart.updateChart(message);
        }
        if (topic === "channel/pressure") {
            console.log(`Received message on ${topic}: ${message}`);
            pressureChart.updateChart(message);
        }
        if (topic === "channel/humidity") {
            console.log(`Received message on ${topic}: ${message}`);
            humidityChart.updateChart(message);
        }
        if (topic === "channel/comparative_categories") {
            console.log(`Received message on ${topic}: ${message}`);
            radarChart.updateChart(message);
        }
        if (topic === "channel/heatmap") {
            console.log(`Received message on ${topic}: ${message}`);
            heatMap.updateChart(JSON.parse(message));
        }
    });
}

