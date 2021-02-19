/// <reference types ="Cypress" />

export class invoiceSettingsPage {
    url = "/channel/settings/invoice";
    invoiceLogoURL = "[id='logo']";
    header = "[data-auto-container='InvoiceSettings:grid:description']";

    waitForPageLoad(){
        cy.get(this.invoiceLogoURL).should('be.visible');
    }

    open(){
        cy.visit(this.url);
        this.waitForPageLoad();
        cy.wait(1000);
    }

    clickSaveBtn(){
        cy.get("[class='ContainerContent__ContainerContentWrapper-ujwxnt-0 biPyBW']").find('span').contains('Save').click();
        cy.wait(1000);
        cy.get('div').contains('Logo updated').should('be.visible');
    }

    verifyHeader(){
        this.waitForPageLoad();
        cy.get(this.header).find('h1').should('have.text','Invoice Settings');
    }
}
export const invoiceSettings = new invoiceSettingsPage();