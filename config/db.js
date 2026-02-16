const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://parthDB:rTClH4VGj4USrHKx@startmongodb.ijf5ic6.mongodb.net/", // This will return a Promise
  );
};

module.exports = connectDB;
