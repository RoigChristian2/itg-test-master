/// <reference types ="Cypress" />

export class invoicesPage {
    url = "/invoices";
    pageTitle = "[data-auto-container='Invoices:grid:description']"
    tableWrapper = "[data-testid='table-wrapper']"
//asd

    open(){
        cy.visit(this.url);
        cy.get(this.pageTitle).should('be.visible')
    }

    clickTableRowByRowNumber(index){
        cy.get(this.tableWrapper).find('table').find('tr').eq(index).click()
        cy.wait(1000)
        cy.get(this.tableWrapper).should('be.visible')
    }

    verifyLogo(imageURL){
        let imageLocater = "[data-testid=\""+imageURL+"\"]"
        cy.get(imageLocater).should('be.visible')
    }
}
export const invoices = new invoicesPage();