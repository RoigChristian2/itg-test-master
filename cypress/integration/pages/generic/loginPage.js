/// <reference types ="Cypress" />
/**
 * @author: Jai
 */
export class LoginPage {
    url = "/login";
    title ='Log In';
    username = '#username';
    password = '#password';
    loginBtn = "//button[@name='signin']";
    nextBtn = ".Button__ButtonComponent-sc-__ktwawd-0"
    paswdBtn = ".PasswordPanel  .Button__ButtonComponent-sc-__ktwawd-0"
    searchBox_HomePage = "//input[@data-auto-input='search:input']";

    open(){
        cy.visit(this.url);
        // cy.title().should("contain", this.title);
    }
    login(userName, password){
        cy.get(this.username).should('be.visible').type(userName)
        cy.get(this.nextBtn).click()
        cy.get(this.password).should('be.visible').type(password);
        cy.get(this.paswdBtn).click({force: true});
        // cy.xpath(this.loginBtn).should('be.visible').click({force: true});
    }

    logout(){
        cy.visit("/logout");
        //wait for logout to complete (home screen search box)
        cy.xpath(this.searchBox_HomePage).should('be.visible');
    }
}

export const loginPage = new LoginPage();