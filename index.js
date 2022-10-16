const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(cors());

const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

// middleware for path of pictures
const multipartMiddleware = multipart({
    uploadDir: './pictures'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// endpoint test
app.get("/", (req, res) => {
    res.send("Hello Sentiments");
});

// endpoint: for upload an image
app.post('/api/uploadPicture', multipartMiddleware, (req, res, next) => {
    res.json({
        'message': 'Picture uploaded successfully.'
    });
});

// prepare the server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))