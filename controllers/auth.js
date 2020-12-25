const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
var expresjwt = require("express-jwt");

// exports.signup = (req, res) => {
//   console.log("REQ BODY", req.body);

//   res.json({
//     message: "signup route works"
//   });
// };

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      // param: errors.array()[0].param
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user is database",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  // console.log("hello" + req.body.email);
  // console.log("hello" + req.body.password);
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email ddoes not exeist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email and password do naot match",
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET );
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 99999 });
    //send the responce to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfully",
  });
};

//protected routes
exports.isSignedIn = expresjwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ['HS256']  
});

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied   " + req.profile._id + " " + req.auth._id + " ",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "access denined to krega hi na tu admin tjodi hai",
    });
  }

  next();
};
