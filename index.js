const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

mongoose
  .connect(process.env.MONGODB_URI)
    .then(console.log("Connected to MongoDB"))
    .catch(err=>console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "images")
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors())
app.post("/upload", upload.single("postImage"), (req, res)=>{
  res.status(200).json("File has been uploaded");
});

app.use(express.json())
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running!");
});
