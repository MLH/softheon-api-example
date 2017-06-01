// Require the relevant libraries
const SoftheonAPI = require('../lib')
const dotenv = require('dotenv');

// Source ENV variables from the .env file
dotenv.load();

let client_id = process.env.SOFTHEON_CLIENT
let client_secret = process.env.SOFTHEON_SECRET

// Create a new instance of the Softheon API
var softheon = new SoftheonAPI(client_id, client_secret)

// Sample credit card object
let creditCardInfo = {
    cardNumber: "4111113956134018",
    securityCode: "123",
    expirationMonth: "11",
    expirationYear: "2017",
    cardHolderName: "John Doe",
    billingAddress: {
      address1: "1201 Broadway",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    email: "swift@mlh.io",
    referenceId: "credit_card_example"
}

// Create the new credit card object and process a payment
softheon
  .creditcards.create(creditCardInfo)
  .then( (body) => {
      return softheon.payments.create({
        paymentAmount: "100000.51",
        description: "Cost of goods",
        referenceId: "payment_10101",
        paymentMethod: {
          paymentToken: body.token,
          type: "Credit Card"
        }
      })
  })
  .then( (body) => {
    console.log("PAYMENT SUCCESS:\n")
    console.log(body)
  })
  .catch( (err) => console.error(err.message) )
