/// <reference types ="Cypress" />
/**
 *@author :Kusum Khandelwal
 * This class is going to use to perform operation on feature flag page.
 */

export class FeatureFlagsPage {
    #urlFeatureFlag = "/superuser/marketplaces#feature-flags";

    #flagLocatorCSS = "div label:contains('DYNAMIC_LOCATOR_VALUE')";
    #flagValue = "div input[checked='checked'] + label";
    #radioButton = "input[type='radio']";
    #confirmLink = "button[class*='adb-button__primary buttonResponse']";
    #getAlldivForfeaturePage = "body[class*='superuser logged'] > div";
    #alertConfirmationMsg = "span[class='feedbackPanelINFO']";
    #saveButtonPop_up = "button[class='adb-button__primary buttonResponse']";
    #saveSetting = "button[name='jBillingDependentFeaturesSave']";
    #confirmMsg = "Your marketplace settings have been saved!";
    #radioButtonlabel = "label:contains('DYNAMIC_LOCATOR_VALUE')";
    #flagNameCss = "div[id='channelSettings'] div > label:contains('DYNAMIC_LOCATOR_VALUE')"
    #flagBtnCss = "div[class='form-field'] div[class*='checkbox-item'] > label:contains('DYNAMIC_LOCATOR_VALUE')"
    #nonBillingSettingBtn = "span:contains('Save Non-Billing Settings')"

    /*
    *This function use to open featureflag
    * */

    open() {
        cy.visit(this.#urlFeatureFlag);
        cy.waits();
    }

    /*
    * This function will enable disable feature flag
    * @param :flagName
    * flag name of feature flag
    * @param : flagValue
    * value of flag either true or false.
    * */

    fetaureFlagEnableorDisable(flagName, flagValue) {
        cy.get(this.#flagLocatorCSS.replace("DYNAMIC_LOCATOR_VALUE", flagName)).parent('div').as("row");
        if (flagValue) {
            cy.get('@row').find(this.#flagValue).then(($value) => {
                if (!$value.text().includes('Enable')) {
                    cy.get('@row').find(this.#radioButtonlabel.replace('DYNAMIC_LOCATOR_VALUE', 'Enable')).parent().as("checkbox").then(() => {
                        cy.get('@checkbox').find(this.#radioButton).check({force: true});
                        cy.waits();
                        cy.get(this.#getAlldivForfeaturePage).each(($div) => {
                            if ($div.hasClass("wicket-modal")) {
                                cy.get(this.#confirmLink).click();
                            }
                        });
                        cy.get(this.#saveSetting).click();
                        cy.get(this.#saveButtonPop_up).click();
                        cy.get(this.#alertConfirmationMsg).should("contain.text", this.#confirmMsg);
                    });
                }
            });
        } else if (!flagValue) {
            cy.get('@row').find(this.#flagValue).then(($value) => {
                if (!$value.text().includes('Disable')) {
                    cy.get('@row').find(this.#radioButtonlabel.replace('DYNAMIC_LOCATOR_VALUE', 'Disable')).parent().as("checkbox").then(() => {
                        cy.get('@checkbox').find(this.#radioButton).check({force: true});
                        cy.waits();
                        cy.get(this.#getAlldivForfeaturePage).each(($div) => {
                            if ($div.hasClass("wicket-modal")) {
                                cy.get(this.#confirmLink).click();
                            }
                        });
                        cy.get(this.#saveSetting).click();
                        cy.get(this.#saveButtonPop_up).click();
                        cy.get(this.#alertConfirmationMsg).should("contain.text", this.#confirmMsg);
                    });
                }
            });
        }
    }

    /**
     * This function will enable/disable any flag.
     *
     * @param flagName
     * Feature flag name
     *
     * @param flagValue
     * Feature flag value (true->Enable/false->Disable)
     */
    fetaureFlagEnableorDisableWithoutSave(flagName, flagValue) {

        if (flagValue) {
            cy.get(this.#flagNameCss.replace('DYNAMIC_LOCATOR_VALUE', flagName)).parent().find(this.#flagBtnCss.replace('DYNAMIC_LOCATOR_VALUE', 'Enable')).prev().check()
        } else {
            cy.get(this.#flagNameCss.replace('DYNAMIC_LOCATOR_VALUE', flagName)).parent().find(this.#flagBtnCss.replace('DYNAMIC_LOCATOR_VALUE', 'Disable')).prev().check()
        }

    }

    /**
     * Save non billing settings by clicking on 'Save Non-Billing Settings' button.
     */
    saveNonBillingSetting() {
        cy.get(this.#nonBillingSettingBtn).click()
        cy.get(this.#saveButtonPop_up).click();
        cy.get(this.#alertConfirmationMsg).should("contain.text", this.#confirmMsg);
    }

}

export const featureFlagsPage = new FeatureFlagsPage();