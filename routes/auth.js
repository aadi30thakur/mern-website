var express = require("express");

var router = express.Router();
const { check } = require("express-validator");

const { signout, signup, signin, isSigneddIn } = require("../controllers/auth");

//__________________________to send a messsage as a string ___________________
// const signout = (req, res) => {
//     res.send("user Sigout sucess");
// };
//__________________________to send a messsage as json ___________________

// const signout = (req, res) => {
//   res.json({
//     message: "user signout"
//   });
// };
router.post(
  "/signup",
  [
    check("name", "name should b at least 3 character").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be minimmus of 3 character").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password feild is cumpulsory").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
