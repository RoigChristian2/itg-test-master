/// <reference types ="Cypress" />

export class ProductsHomePO {
    url = "/cms/products";

    open(){
        cy.visit(this.url);
        this.waitForPageLoad();
        cy.wait(1000);
    }

}
export const productsHome = new ProductsHomePO();