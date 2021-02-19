/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */
class APIClass {

    //API Methods
    #postMethodLabel = 'POST'
    #getMethodLabel = 'GET'

    //Role
    #channelAdminLabel = 'ROLE_CHANNEL_ADMIN'

    //Headers
    #applicationJson = 'application/json'
    #adTenant

    //Other variables
    #bearerLabel = 'Bearer '

    //URI
    #authTokenURI
    #itgConfigServiceURI
    #getAccessTokenAPIEndPointURI = '/oauth2/token'
    #getTokenListURI = '/api/v1/invoices/config/templateTokens?groupByCategory=true'


    /**
     * Get access token (POST: /oauth2/token) and fetch all important variables
     * from 'GenericParameters.json' and save them to instance.
     *
     * @returns {Cypress.Chainable<any>}
     * Promise of response body
     */
    getAccessTokenForChannelAdmin() {
        let grantType, clientKey, clientSecret, userName, password

        cy.fixture("GenericParameters.json").as("genericParameters");
        let chainable = cy.get("@genericParameters").then((genericParameters) => {
            grantType = genericParameters.oAuth2.scopeChannelAdmin.grantType
            clientKey = genericParameters.oAuth2.scopeChannelAdmin.clientKey
            clientSecret = genericParameters.oAuth2.scopeChannelAdmin.clientSecret
            userName = genericParameters.oAuth2.scopeChannelAdmin.username
            password = genericParameters.oAuth2.scopeChannelAdmin.password
            this.#adTenant = genericParameters.adTenant
            this.#authTokenURI = genericParameters.authTokenURI
            this.#itgConfigServiceURI = genericParameters.itgConfigServiceURI

        }).then(() => {
            cy.request(
                {
                    method: this.#postMethodLabel,
                    url: this.#getAccessTokenAPIEndPointURI,
                    form: true,
                    body: {
                        grant_type: grantType,
                        scope: this.#channelAdminLabel,
                        client_id: clientKey,
                        client_secret: clientSecret,
                        username: userName,
                        password: password
                    }
                })
        });
        return chainable
    }

    /**
     * Get auth token (GET: /api/v1/authorize).
     *
     * @returns {Cypress.Chainable<any|JQuery<E>> | Cypress.Chainable<any> |
     * Cypress.Chainable<Cypress.Chainable<any|JQuery<E>>> | Cypress.Chainable<object |
     * any[] | string | number | boolean> | Cypress.Chainable<any>}
     */
    getAuthToken() {

        return this.getAccessTokenForChannelAdmin().then(accessTokenResponse => {
            return cy.request({
                method: this.#getMethodLabel,
                url: this.#authTokenURI,
                headers: {
                    'Authorization': this.#bearerLabel + accessTokenResponse['body']['access_token'],
                    'AD-Tenant': this.#adTenant,
                    'Content-Type': this.#applicationJson
                }

            }).then(authTokenResponseBody => {
                return authTokenResponseBody['body']['token']
            })

        })
    }

    /**
     * Adding one sample method to refer how to use auth token.
     * This method will fetch the response body of templateTokens, using ITG-Config service (/api/v1/invoices/config/templateTokens?groupByCategory=true)
     *
     * @returns {Cypress.Chainable<any> | Cypress.Chainable<object | any[] | string | number | boolean> | Cypress.Chainable<Subject>}
     * Returns promise of response body
     */
    getTemplateTokens() {
        return this.getAuthToken().then(some => {
            cy.request({
                method: this.#getMethodLabel,
                url: this.#itgConfigServiceURI+this.#getTokenListURI,
                headers: {
                    'AD-Authorization': this.#bearerLabel + some,
                    'AD-Tenant': this.#adTenant,
                    'Content-Type': this.#applicationJson
                }
            })
        })
    }

}

//Export statement
export const apiClass = new APIClass()