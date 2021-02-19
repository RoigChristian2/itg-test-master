/// <reference types ="Cypress" />

export class GeneralSettingsPO {
    url = "/channel/settings/general";
    marketPlaceName = "[name='marketplaceName']"

    open(){
        cy.visit(this.url);
        cy.get(this.marketPlaceName).should('be.visible');
        cy.wait(1000);
    }
}
export const generalSettingsPO = new GeneralSettingsPO();