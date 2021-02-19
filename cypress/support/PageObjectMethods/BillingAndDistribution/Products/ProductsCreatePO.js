/// <reference types ="Cypress" />

export class ProductsCreatePO {
    url = "/cms/create";
    productName = "[id='appNameField']"
    //Service Type
    standalone = "[id='standalone']"
    addon = "[id='addon']"
    //product Tyepe
    //Integration Type
    referralOnly =  "[id='referral']"
    buyableOnly = "[id='buy']"
    importOnly = "[id='import']"
    fullIntegration = "[id='fullIntegration']"
    //fullIntegration = "[id='fullIntegration']" //use for test env

    //Usage Model
    singleUser = "[id='singleUser']"
    multiUser = "[id='multiUser']"
    //Revenue Model
    free = "[id='free']"
    oneTime = "[id='one_time']"
    recurring = "[id='recurring']"
    tiered = "[id='tiered']"
    //termsAndConditions
    termsAndConditions = "[id='termsAndConditions']"
    createProductBtn = "[name='createButton']"

    open(){
        cy.visit(this.url);
        cy.wait(5000);
        this._waitForPageLoad();
    }

    _waitForPageLoad(){
        cy.get(this.productName).should('be.visible');
    }

}
export const productsCreate = new ProductsCreatePO();