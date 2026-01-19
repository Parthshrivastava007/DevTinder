const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://parthDB:l6hIu2UydYrMmo8n@startmongodb.ijf5ic6.mongodb.net/", // This will return a Promise
  );
};

module.exports = connectDB;
