const express = require('express');
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const mongoose = require("mongoose");
const Router = require("./routes");
const vision_app = require("./vision");
const app = express();

// configurations for the server app
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/',
    {
        dbName: "face_analysis_db",
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) =>
        err ? console.log(err) : console.log(
            "Connected to face_analysis_db database")
);

// middleware for path of pictures
const multipartMiddleware = multipart({
    uploadDir: "./uploadss"
});

// endpoint test
app.get("/", (req, res) => {
    res.send("Hello Sentiments");
});

// ==================================================

// auxilliar for upload the images
const multer = require("multer");
const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine
});

// endpoint: for upload an image (definitive)
app.post("/uploadPicture", upload.single("image"), async (req, res) => {
    vision_app.vision_function(req.file.filename);
    res.json({
        'message': 'Picture uploaded successfully.'
    });
});

// endpoint: for upload an image
app.post('/uploadPictures', multipartMiddleware, async (req, res, next) => {
    console.log("request: ", req.files.mFiles);
    try {

        const files = req.files;

        const promises = files.map((file) => {
            const savePath = path.join(__dirname, 'uploads', file.name);
            return file.mv(savePath)
        })

        console.log("files uploaded");
        res.json({
            'message': 'Picture uploaded successfully.'
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// using methods from routes.js
app.use(Router.app);

// prepare the server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))