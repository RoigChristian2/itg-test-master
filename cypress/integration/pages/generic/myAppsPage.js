/// <reference types ="Cypress" />
/**
 * @author: Jai
 */
export class MyAppsPage {
    url = "/";
    title ='MyApps | AppDirect, Inc.';

    open(){
        cy.visit(this.url);
        cy.title().should("contain", this.title);
    }
}

export const myAppsPage = new MyAppsPage();