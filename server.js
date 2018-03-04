const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = 5050;
const app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("Client connected"),
        setInterval(() => getApiAndEmit(socket), 10000);

    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
    try {
        let latitude, longitude;

        socket.on("event", (coordinates) => {
            latitude = coordinates.latitude;
            longitude = coordinates.longitude;
        });

        const res = await axios.get(
            `http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${latitude}&lng=${longitude}&fDstL=0&fDstU=100&Mlat=true&Alt=0`
        );
        console.log(res);

        socket.emit("FromAPI", res.data);

    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

server.listen(port, () => console.log(`Listening on port ${port}`));