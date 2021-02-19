/// <reference types ="Cypress" />

export class ProductsEditPO {
    //parent div
    parentDiv = "[id='appDashboardStatus']"
    //Left Nav
    editionsAndPricing = "[id='editionsAndPricing']"

    //Manage Pricing Edition tab (Recurring edition)
    editionCodeTxt = "[name='editionCodeBorder:editionCodeBorder_body:editionCode']"
    savePlan = "//button[@name='save']"

    //save successful message
    saveSuccessMsg = "//div[@class='feedback-container']//span"

    _waitForPageLoad(){
        cy.wait(5000); //need extra wait since create product req take more time
        cy.get(this.parentDiv).should('be.visible')
    }

    _clickRecurringEdition(){
        cy.get(this.editionsAndPricing).find('a').contains('Editions').click({force:true})
        cy.wait(1000);
        cy.get(this.editionsAndPricing).find('span').contains('Recurring Edition').click({force:true})
        cy.get(this.editionCodeTxt).should('be.visible')
    }

    _setEditionCode(editionCode){
        cy.get(this.editionCodeTxt).clear({force:true})
        cy.get(this.editionCodeTxt).type(editionCode)
        cy.wait(1000);
    }

    _clickSavePlan(){
        cy.xpath(this.savePlan).click({force:true})
        cy.wait(2000);
    }
    _verifySaveMsg(){
        cy.xpath(this.saveSuccessMsg).should("have.text", "Your pricing edition has been saved.")
    }

}
export const productsEdit = new ProductsEditPO();