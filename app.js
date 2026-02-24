require('dotenv').config();
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");
const userRouter = require("./routes/userRouter");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();


app.set("views" , "views")
app.set("view engine" , "ejs")

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRouter)
app.use("/new", messageRouter)
app.use("/", indexRouter)

app.listen(PORT, (err) => {
  if (err) throw new Error(err);

  console.log("Server listening on PORT:" + PORT);
});

