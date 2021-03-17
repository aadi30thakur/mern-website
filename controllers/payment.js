const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "9pnqmgt6sd5w8y34",
    publicKey: "td4tggcvp8gpxn4j",
    privateKey: "fca98b6fbb7355c6fe3a8886c72423a1"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({

    }, (err, response) => {
        // pass clientToken to your front-end
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
}


exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(result)
        }
    });

}