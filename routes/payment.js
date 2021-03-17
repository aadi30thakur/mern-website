const expres = require("express");
const router = expres.Router();
const { isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/Payment");

router.get("/payment/gettoken/:userId", isSignedIn, getToken);

router.post("/payment/braintree/:userId", isSignedIn, processPayment)



module.exports = router;