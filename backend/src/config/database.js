const mongoose = require('mongoose');
require('dotenv').config();

const main = async () => {
//   console.log("Current Mongo URI:", process.env.DB_URI); // Add this line
  await mongoose.connect(process.env.DB_URI);
};

module.exports = main;