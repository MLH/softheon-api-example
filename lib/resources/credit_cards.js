/**
 * Creates a new instance of a Softheon Payments API client
 * that specifically deals with the Credit Cards endpoints.
 *
 * @class
 */
class CreditCards {

  /**
   * @constucts CreditCards
   * @param {String} client - An instance of SoftheonAPI
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * This call allows you to pass credit card information and receive a token.
   *
   * @params {Object} options - The options for your new credit card
   * @params {String} options.cardNumber - Credit Card Number
   * @params {String} options.securityCode - Credit Card Security Code
   * @params {String} options.expirationMonth - The month when the Credit Card expires
   * @params {String} options.expirationYear - The year when the Credit Card expires
   * @params {String} options.cardHolderName - The name of the Credit Card holder
   * @params {Object} options.billingAddress - The address of the Credit Card holder
   * @params {String} options.billingAddress.address1 - The first line of the street address.
   * @params {String} [options.billingAddress.address2] - The second ine of the street address.
   * @params {String} options.billingAddress.city - The city where the address is located.
   * @params {String} options.billingAddress.state - The state where the address is located.
   * @params {String} options.billingAddress.zipCode - The postal code where the address is located.
   * @params {String} options.email -  The email address of the Credit Card holder
   * @params {String} [options.referenceId] - The client application provided reference ID for the credit card.
   * @params {String} [options.redirectUrl] - The URL that the client will be redirected to after the credit card has been created.
   *
   * @returns {Object} Returns a Promise that resolves when the HTTP request is done.
   */
  create(options) {
    let path = "/payments/v1/creditcards"
    return this._client.post(path, options);
  }
}

module.exports = CreditCards
