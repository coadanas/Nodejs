const express = require("express");
const app = express();
const userRouter = express.Router();
// const cookieParser = require('cookie-parser');
const userModel = require('../models/userModel')


userRouter
.route("/")
.get(protectUser, getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route("/getCookies")
.get(getCookies)

userRouter
.route("/setCookies")
.get(setCookies)


const jwt = require("jsonwebtoken");
const JWT_KEY = "akhdibwgauoqpplcbsi";
// // let flag = false; // if "true" means you are logedin other wise "false" means you are not logedin
//         req.cookies &&
function protectUser(req, res, next) {
  try {
    if (req.cookies.login) {
      let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
      if (isVerified) {
        next()
      } else {
        return res.json({
          message: "not verified"
        });
      }
    } else {
      return res.json({
        message: "You are not allowed"
      });
    }
  }
  catch(err) {
    console.log(err)
  }
}


async function getUser(req, res) {
  let user = await userModel.find();
  if (user) {
    return res.json({
      data: user
    })
  } else {
    return res.json({
      message: "data not found"
    })
  }
}

function postUser(req, res, next) {
  const user = req.body;
  return res.json({
    meassge: "data posted",
    data: user
  });
}

async function updateUser(req, res, next) {
  let dataToBeUpdate = req.res;
  let user = await userModel.findOneAndUpdate({
    name: "anas"
  }, dataToBeUpdate);
  return res.json({
    message: "data updated successfully",
    data: user
  });
}

async function deleteUser(req, res, next) {
  let dataToBeDelete = req.body;
  let user = await userModel.findOneAndDelete({
    email: "kas@gmail.com"
  }, dataToBeDelete);
  return res.json({
    meassge: "data deleted successfully",
    data: user
  })
}


function setCookies(req, res) {
  res.cookie("isPrimeMember", true)
  res.send("cookies has been set");
}
function getCookies(req, res) {
  let cookies = req.cookies;
  // console.log("cookies : " + cookies);
  res.send("cookies recived");
}



module.exports = userRouter;