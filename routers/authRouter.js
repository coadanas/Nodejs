const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const authRouter = express.Router();
const userModel = require('../models/userModel')

const jwt = require("jsonwebtoken");
const JWT_KEY = "akhdibwgauoqpplcbsi";

authRouter
.route("/signup")
.get(getSignUp)
.post(postSignUp)

authRouter
.route("/login")
.post(loginUser)

function getSignUp(req, res) {
  res.render("index.hbs")
};

async function postSignUp(req, res) {
  try {
    let obj = req.body;
    const user = await userModel.create(obj);
    console.log(user)
    res.render("index.hbs");
  }
  catch(err) {
    res.status(404).send(err)
  }
};

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({
        email: data.email
      })
      if (user) {
        if (user.password === data.password) {
          let uid = user("_id"); //uid
          let JWT = jwt.sign({
            payload: uid
          }, JWT_KEY);
          res.cookie("login", JWT, {
            httpOnly: true
          });
          return res.json({
            message: "user logined",
            data: data
          })
        } else {
          return res.json({
            message: "wrong caredantial"
          })
        }
      } else {
        return res.json({
          message: "user not found"
        })
      }
    } else {
      return res.json({
        message: "empty feild found"
      })
    }
  }
  catch(err) {
    return res.json({
      error: err
    })
  }
}

module.exports = authRouter;