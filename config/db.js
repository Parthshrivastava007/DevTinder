const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://parthDB:X07fRLQJbnDgQlJ2@startmongodb.ijf5ic6.mongodb.net/", // This will return a Promise
  );
};

module.exports = connectDB;
