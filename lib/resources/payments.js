/**
 * Creates a new instance of a Softheon Payments API client
 * that specifically deals with the Payments endpoints.
 *
 * @class
 */
class Payments {

  /**
   * @constucts Payments
   * @param {String} client - An instance of SoftheonAPI
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * Process a payment using a token.
   *
   * @params {Object} options - The options for your new credit card
   * @params {Number} options.paymentAmount - The Payment Amount
   * @params {String} options.description - A description of the payment's purpose
   * @params {Object} options.paymentMethod - An object representing the payment method for this payment.
   * @params {String} options.paymentMethod.paymentToken - The credit card or bank account token that will be used for payment.
   * @params {String} options.paymentMethod.type - Can be Credit Card or ACH.
   * @params {String} [options.referenceId] - The client application provided reference ID for the credit card.
   *
   * @returns {Object} Returns a Promise that resolves when the HTTP request is done.
   */
  create(options) {
    let path = "/payments/v1/payments"
    return this._client.post(path, options);
  }
}

module.exports = Payments
