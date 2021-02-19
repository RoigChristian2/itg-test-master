/// <reference types ="Cypress" />

export class billingFunctionalityPage {
    url = "/channel/settings/#billing";
    header = "[id='channelSettings']"
    dailySpendLimit_cb = "[name='purchaseLimitContainer:purchaseLimitCheck']"

    waitForPageLoad(){
        cy.get(this.dailySpendLimit_cb).should('be.visible');
    }

    open(){
        cy.visit(this.url);
        this.waitForPageLoad()
        cy.wait(1000);
    }

    verifyHeader(){
        this.waitForPageLoad()
        cy.get(this.header).find('h1').should('have.text','Billing');
    }
}
export const billingFunctionality = new billingFunctionalityPage();