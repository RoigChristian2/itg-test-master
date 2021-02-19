/// <reference types ="Cypress" />
/*
 *author: Kusum Khandelwal
 *This class to login and logout from marketplace.
*/

export class Authentication {
    url = "/login";
    title ='AppDirect';
    username = '#username';
    password = '#password';
    loginBtn = '#id7';
    #logoutUrl="/logout";

    /**
     * this method is going to use launch the login page and verify title
     */

    open(){
        cy.visit(this.url);
        cy.title().should("contain", this.title);
    }

    /**
     * this method is going to use to login into the marketplace.
     * @userName
     * this will be value of username.
     * @password
     * password to login into marketplace.
     */

    login(userName, password){
        cy.get(this.username).type(userName);
        cy.get(this.password).type(password, {log:false});
        cy.get(this.loginBtn).click({force: true});
    }

    /*
    * This function will going to use to logout from the marketplace.
    * */
    logout(){
        cy.visit(this.#logoutUrl) ;   }
}

export const authentication = new Authentication();