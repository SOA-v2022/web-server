const faceModel = require("./models");

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: "vision_api_key.json"
});

async function vision_function(face_analysis) {
    // face_analysis = 'sadface.jpg'

    // Performs face detection on the image file
    const [result] = await client.faceDetection(`./images/${face_analysis}`);
    const faces = result.faceAnnotations;
    console.log(`Image: ${face_analysis}`);
    faces.forEach((face, i) => {
        joyEm = face.joyLikelihood
        angerEm = face.angerLikelihood
        sorrowEm = face.sorrowLikelihood
        surpriseEm = face.surpriseLikelihood
    });

    // prepare object data
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

module.exports = {
    vision_function,
}