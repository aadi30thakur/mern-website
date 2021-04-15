require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const { urlencoded } = require("body-parser");
const path = require("path");
// mongoose.connect("mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

try {
  // keepAlive.js
  const fetch = require('node-fetch');
  // globals
  const interval = 60 * 25 * 1000; // interval in milliseconds - {25mins x 60s x 1000}ms
  const url = "https://tees-store.herokuapp.com/api/products"
  function wake() {
    try {
      const handler = setInterval(() => {
        fetch(url)
          .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
      }, interval);
    } catch (err) {
      console.error('Error occured: retrying...')
      clearInterval(handler);
      return setTimeout(() => wake(), 10000);
    };
  };
  wake();
} catch (err) {
  console.log(err)
}













mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//muyfun.run()
//.then() if it is runnioig then then executes
//.catch() else catch handles all the errors

//_________________________________________________________________________________________
//MIDDLE WARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
//_________________________________________________________________________________________
//My routes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
//_________________________________________________________________________________________
//port
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  //set a static folder
  app.use(express.static("./frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//_________________________________________________________________________________________
// starting server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
