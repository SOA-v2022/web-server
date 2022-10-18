const express = require("express");
const faceModel = require("./models");
const app = express();

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: "vision_api_key.json"
});


//change method
// app.get("/upload", async (request, response) => {
async function vision_function(face_analysis) {

    // face_analysis = 'sadface.jpg'

    // Performs face detection on the image file
    const [result] = await client.faceDetection(`./images/${face_analysis}`);
    //const [result] = await client.faceDetection('./img/happyface.jpg');
    const faces = result.faceAnnotations;
    console.log(`Image: ${face_analysis}`);
    faces.forEach((face, i) => {
        // console.log(`    Joy:      ${face.joyLikelihood}`);
        // console.log(`    Anger:    ${face.angerLikelihood}`);
        // console.log(`    Sorrow:   ${face.sorrowLikelihood}`);
        // console.log(`    Surprise: ${face.surpriseLikelihood}`);
        joyEm = face.joyLikelihood
        angerEm = face.angerLikelihood
        sorrowEm = face.sorrowLikelihood
        surpriseEm = face.surpriseLikelihood
    });


    const annotations = {
        img: face_analysis,
        joy: joyEm,
        anger: angerEm,
        sorrow: sorrowEm,
        surprise: surpriseEm
    };

    console.log(annotations);

    const face = new faceModel(annotations);

    try {
        await face.save();
        //     response.send(face);
    } catch (error) {
        //     response.status(500).send(error);
        console.log(error);
    }
}

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
    vision_function,
    // function3
 }