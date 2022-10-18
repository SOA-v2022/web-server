const express = require("express");
const faceModel = require("./models");
const app = express();

// return the database of sentiments
app.get("/faces", async (request, response) => {
    const faces = await faceModel.find({});

    try {
        response.send(faces);
    } catch (error) {
        response.status(500).send(error);
    }
});

// module.exports = app;
module.exports = {
    app,
}