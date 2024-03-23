const express = require("express");
const dotenv = require("dotenv");
const cokkieParser = require("cookie-parser");
console.log("hhwdeiugi");

dotenv.config();
const PORT = process.env.PORT || 5000;
const connectToMongoDB = require("./db/connectToMongodb");
const app = express()

const authroutes = require("./routes/auth_routes");
const messageroutes = require("./routes/message_routes");
const userroutes = require("./routes/user_routes");

app.use(express.json());
app.use(cokkieParser());

app.get("/", (req, res, next) => {
  res.json("hii 😊");
});

app.use("/api/auth", authroutes);
app.use("/api/messages", messageroutes);
app.use("/api/users", userroutes);

console.log();

app.listen(5000, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
