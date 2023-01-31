const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_LOCAL_URI, {}).then((con) => {
    console.log(`Mongo db connected with Host: ${con.connection.host}`);
  });
};

module.exports = connectDatabase;
