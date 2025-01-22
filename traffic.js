// Require necessary modules
const express = require('express');
const app = express();
const PORT = 3000;

// Simulated traffic data for intersections
let intersections = [
    { id: 1, north: 10, south: 8, east: 5, west: 7 },
    { id: 2, north: 7, south: 9, east: 10, west: 6 },
];

// Function to optimize traffic signal timings
function optimizeTraffic(intersections) {
    intersections.forEach(intersection => {
        let totalTraffic = intersection.north + intersection.south + intersection.east + intersection.west;
        intersection.signalTiming = {
            northSouth: Math.round((intersection.north + intersection.south) / totalTraffic * 60),
            eastWest: Math.round((intersection.east + intersection.west) / totalTraffic * 60)
        };
    });
}

// Endpoint to get optimized signal timings
app.get('/optimize', (req, res) => {
    optimizeTraffic(intersections);
    res.json(intersections);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
