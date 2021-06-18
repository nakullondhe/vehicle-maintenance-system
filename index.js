const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

const Routes = require('./routes/Index');

// Import MiddleWare
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');

// DB connection
mongoose.connect("mongodb://localhost:27017/vms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false 
}).then(() => {
  console.log("DATABASE connected");
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", Routes);

//PORT
const port  = process.env.PORT || 8000;

// Start Server
app.listen(port, () => {
  console.log('\x1b[36m%s\x1b[0m',`app is running at port : ${port}`);
})
