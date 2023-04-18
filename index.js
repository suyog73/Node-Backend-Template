const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const connectDatabase = require("./database/connection");

const app = express();
const userRouter = require('./Routers/userRouter')
const projectRouter = require('./Routers/projectRouter')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

connectDatabase();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  await db.collection("users").createIndex({ username: 1, email: 1 }, { unique: true });
});

app.use("/project", projectRouter);
app.use("/user", userRouter);


// Testing request to check server is up or not
app.get('/test', (req, res) => {
  res.status(200).send({
    "message": 'Successfully tested!'
  });
});

// Listening on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
