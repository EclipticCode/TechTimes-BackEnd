const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbUrl = process.env.mongoDbUrl;

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(mongoDbUrl);
  console.log(mongoose.connection.readyState, "--- Connection State");
};

module.exports = {
  connectDb,
  mongoose,
};
