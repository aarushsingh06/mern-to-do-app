const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/add", async (req, res) => {
  try {

    const newTask = new Task({
      text: req.body.text
    });

    await newTask.save();

    res.status(201).json({
      message: "Task Added"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

app.get("/tasks", async (req, res) => {
  try {

    const tasks = await Task.find();

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

app.put("/update/:id", async (req, res) => {
  try {

    await Task.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text
      }
    );

    res.status(200).json({
      message: "Task Updated"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

const PORT = 49404;
app.delete("/delete/:id", async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});