const mongoose = require("mongoose");

const FaceSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  joy: {
    type: String,
    required: true,
  },
  anger: {
    type: String,
    required: true,
  },
  sorrow: {
    type: String,
    required: true,
  },
  surprise: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: new Date(),
    // default: new Date().toUTCString(),
    required: false,
  }
});

const Face = mongoose.model("Face", FaceSchema);

module.exports = Face;