const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Shutting down the server due to uncaught Exception");
  process.exit(1);
});
//setting up config file
dotenv.config({ path: "backend/config/config.env" });

//connectingToDatabase
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started on PORT:${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
