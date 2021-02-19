/// <reference types ="Cypress" />
/**
 * @author: Jai
 */
export class FeatureFlagsPage {

    open(){
        cy.visit("/superuser/marketplaces#feature-flags");
        cy.wait(500);
    }
    /*
    toggleFlag("Account Invoice v2", "Enable" or "Disable")
     */
    toggleFlag(flagName, status){
        cy.get('label').contains(flagName).parent().find('label').contains(status).parent().find('input').click({force:true});
    }

    enableFlag(flagName){
        cy.get('label').contains(flagName).parent().find('label').contains("Enable").parent().find('input').click({force:true});
    }

    saveBillingSettings(){
        cy.get("[name='jBillingDependentFeaturesSave']").click();
        this.handleHighRiskSettings()
        this.handleLocalSettings()
        this.verifyConfirmMessage()
    }
    saveBillingSettingsWithoutHighRisk(){
        cy.get("[name='jBillingDependentFeaturesSave']").click();
        this.verifyConfirmMessage()
    }

    handleLocalSettings(){
        cy.wait(500);
        cy.get("#id23 > .adb-styled > #posLabel").click({force:true});
    }

    handleHighRiskSettings() {
        cy.wait(500);
        cy.get("[id='posLabel']").click({force: true});
    }

    verifyConfirmMessage(){
        cy.wait(500);
        cy.get('ul > li.feedbackPanelINFO >span').contains("Your marketplace settings have been saved!");
    }

}

export const featureFlagsPage = new FeatureFlagsPage();