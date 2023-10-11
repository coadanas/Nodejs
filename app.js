const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 7895;
const hostname = "127.0.0.1";

app.listen(port, hostname, ()=> {
  console.log(`http://${hostname}:${port}/auth/signup`)
});

const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use(cookieParser())

// STATIC PATH
const pathjoin = path.join(__dirname, "/public");
app.use(express.static(pathjoin));

// VIEW ENGINE --- HBS
const viewPath = path.join("./tamplate/views");
app.set("view engine", "hbs");
app.set("views", viewPath);

// PARTIALS PATH
const partials = path.join(__dirname, "./tamplate/partials");
hbs.registerPartials(partials)