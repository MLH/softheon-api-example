/**
 * A sample client library for the Softheon Payments API.
 *
 * @author Swift <swift@mlh.io>
 * @version 0.0.1
 * @copyright Major League Hacking 2017
 */

'use strict';

const Request = require('request-promise-native')
const CreditCards = require('./resources/credit_cards.js')
const Payments = require('./resources/payments.js')

/**
 * Creates a new instance of a Softheon Payments API client.
 *
 * @class
 */
class SoftheonAPI {


  /**
   * @constucts SoftheonAPI
   * @param {String} client_id - The Softheon API Client ID.
   * @param {String} client_secret - The Softheon API Client Secret.
   */
  constructor(client_id, secret) {
    this._client_id = client_id
    this._secret = secret
    this._token = null
    this._baseUrl = "https://hack.softheon.io/api"

    this.creditcards = new CreditCards(this);
    this.payments = new Payments(this);
  }

  /**
   * Gets the default optsions for a typical API request.
   *
   * @returns {Object} An HTTP request configuration object.
   */
  get _defaultOptions() {
    return {
      rejectUnauthorized: false,
      method: "GET",
      headers: { "Accept": "application/json" },
      auth: {
        bearer: this._token
      }
    }
  }

  /**
   * Authenticate with the Softheon API using the client_id and client_secret.
   *
   * @returns {Object} Returns a Promise that resolves when an access token is assigned.
   */
  authenticate() {
    let options = {
      url: this._baseUrl + "/identity/core/connect/token",
      method: "POST",
      auth: {
        user: this._client_id,
        pass: this._secret
      },
      form: {
        grant_type: "client_credentials",
        scope: "paymentapi"
      }
    }

    return new Promise( (resolve, reject) =>
      this._request(options)
        .then( (body) => {
          this._token = JSON.parse(body)["access_token"]
          resolve()
        })
        .catch(reject)
    )
  }

  /**
   * Make a request to the Softheon API using the passed options. This method does not
   * require or assume any type of Authentication.
   *
   * @params {Object} options - An HTTP request configuration object which overrides the defaults.
   * @returns {Object} Returns a Promise that resolves when the HTTP request is done.
   */
  _request(options) {
    options = Object.assign({}, this._defaultOptions, options)
    return Request(options)
  }

  /**
   * A shortcut for making authenticated POST requests to the Softheon API.
   *
   * @params {String} path - The path to POST to.
   * @params {Object} body - The request body to be POSTed.
   * @returns {Object} Returns a Promise that resolves when the HTTP request is done.
   */
  async post(path, body) {
    if(!this._token) {
      await this.authenticate()
    }

    return this._request({
      url: this._baseUrl + path,
      method: "POST",
      json: true,
      body: body
    })
  }
}

module.exports = SoftheonAPI
