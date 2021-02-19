// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//
Cypress.Commands.add("waits",()=>{
    cy.fixture("Utility.json").as("customtimeout");
    cy.get("@customtimeout").then((customtimeout)=>{
        cy.wait(customtimeout.customtimeout);
    })
});
// Cypress.Commands.add("clickOnDynamicWebElement",(xpath,dynamicVariable)=>{
//             cy.xpath(xpath.replace("DYNAMIC_LOCATOR_VARIABLE",dynamicVariable)).click();
//     }
// )
//     Cypress.Commands.add("click",(webElement)=>{
//         webElement.click()
//     })

Cypress.Commands.add("waitForXHRForSpecifiedTime", (xhrURI, aliasName, waitTime) => {
    cy.server().route(xhrURI).as(aliasName)
    cy.wait("@" + aliasName, {requestTimeout: waitTime})
})

Cypress.Commands.add("waitForRequestToResponseWithStatusCode", (requestURI, requestType, waitTime, expectedResponseCode, aliasName) => {
        cy.server()
        cy.route(requestType, requestURI).as(aliasName)
        cy.wait("@" + aliasName, {requestTimeout: waitTime}).its('status').should('be', expectedResponseCode)
    }
)

Cypress.Commands.add("asLogin", () => {
    const url = Cypress.config().baseUrl;
    const pswd = 'Qatesting2';
    const username = 'christian.roig+re@appdirect.com';

    const usernameInput = 'input[data-name=username]';
    const nextButton = 'button[type=submit]';
    const passwordInput = 'input[data-name=password]';
    const loginButton = '.PasswordPanel >>.accountButton[type=submit]';

    cy
        .visit(`${url}/login`)
        .get(usernameInput)
        .should('be.visible')
        .type(username)

        .get(nextButton)
        .should('be.visible')
        .click()

        .get(passwordInput)
        .should('be.visible')
        .type(pswd)

        .get(loginButton)
        .should('be.visible')
        .click()


})