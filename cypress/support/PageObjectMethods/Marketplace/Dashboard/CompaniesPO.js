/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */
export class CompaniesPO {

    #editCompanyCustomAttributeCss = "table[data-auto-container*='header-profile'] tr dd[data-auto-container*='DYNAMIC_LOCATOR_VARIABLE'] > span"
    #companyCustomAttributeEditTextBoxToolTipCss = this.#editCompanyCustomAttributeCss + "+ div[data-auto-container*='complex-tooltip'] h4[data-auto-label*='DYNAMIC_LOCATOR_VARIABLE']+input"
    #companyCustomAttributeToolTipSaveBtnCss = this.#editCompanyCustomAttributeCss + "+ div[data-auto-container*='complex-tooltip'] button[data-auto-action*='DYNAMIC_LOCATOR_VARIABLE:save']"
    #companyCustomAttributeCheckboxToolTipCss = "table[data-auto-container*='header-profile'] tr dd[data-auto-container*='DYNAMIC_LOCATOR_VARIABLE'] > span + div[data-auto-container*='complex-tooltip']" +
        " div[class*='complex-tooltip-container'] h4[data-auto-label*='DYNAMIC_LOCATOR_VARIABLE']~div span:contains('CHECKBOX_OPTION_DYNAMIC_VARIABLE')"
    #manageCompanyCss = "div[class='status-tops'] a:contains('Manage Company')"
    #manageCompanyDropdownOptionCss = "div[class='dropdown-parent'] ul > li:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #companyCustomAttributeEditTextBoxWindowCss = "form[action*='customAttributesModal'] div[class*='form--field'] input[customattributekey='DYNAMIC_LOCATOR_VARIABLE']"
    #companyCustomAttributeEditCheckboxWindowCss = "form[action*='customAttributesModal'] div[class*='form--field'] span:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #companyCustomAttributeCheckboxWindowCss = "span:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #saveCustomAttributeBtnWindowCss = "div[class='modal-footer']  button span:contains('Save')"

    /**
     * Edit text type company custom attribute on 'Company Details Page'.
     *
     * @param customAttributeKey
     * Exact key of custom attribute
     *
     * @param newCustomAttributeText
     * Custom attribute value to be added in textbox
     */
    editTextTypeCompanyCustomAttribute(customAttributeKey, newCustomAttributeText) {

        cy.get(this.#editCompanyCustomAttributeCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeKey)).find('span').click()
        cy.get(this.#companyCustomAttributeEditTextBoxToolTipCss.split('DYNAMIC_LOCATOR_VARIABLE').join(customAttributeKey)).clear().type(newCustomAttributeText)
        cy.get(this.#companyCustomAttributeToolTipSaveBtnCss.split('DYNAMIC_LOCATOR_VARIABLE').join(customAttributeKey)).click()
    }

    /**
     * Edit checkbox type company custom attribute on 'Company Details Page'.
     *
     * @param customAttributeKey
     * Exact key of custom attribute
     *
     * @param checkboxOptionsList
     * List of options to be checked
     */
    editCheckboxTypeCompanyCustomAttribute(customAttributeKey, checkboxOptionsList) {
        cy.get(this.#editCompanyCustomAttributeCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeKey)).find('span').click().then(() => {
            for (var index = 0; index < checkboxOptionsList.length; index++) {
                var optionValue = checkboxOptionsList[index]
                cy.get((this.#companyCustomAttributeCheckboxToolTipCss.split('DYNAMIC_LOCATOR_VARIABLE').join(customAttributeKey)).replace('CHECKBOX_OPTION_DYNAMIC_VARIABLE', optionValue)).prev().check()
            }
        })
        cy.get(this.#companyCustomAttributeToolTipSaveBtnCss.split('DYNAMIC_LOCATOR_VARIABLE').join(customAttributeKey)).click()
    }

    //--------------------------
    /**
     * Click 'dropdownOption' present under Manage Company dropdown.
     *
     * @param dropdownOption
     * Dropdown option
     */
    selectOptionFromManageCompanyDropdown(dropdownOption) {
        cy.get(this.#manageCompanyCss).click()
        cy.get(this.#manageCompanyDropdownOptionCss.replace('DYNAMIC_LOCATOR_VARIABLE', dropdownOption)).click()
    }

    /**
     * Edit text type company custom attribute on Manage Company > Manage Custom Attribute window.
     *
     * @param customAttributeKey
     * Exact key of custom attribute
     *
     * @param newCustomAttributeText
     * Custom attribute value to be added in textbox
     */
    editTextTypeCompanyCustomAttributeInManageCompanyWindow(customAttributeKey, newCustomAttributeText) {
        cy.get(this.#companyCustomAttributeEditTextBoxWindowCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeKey.toUpperCase())).clear().type(newCustomAttributeText)
    }

    /**
     * Edit checkbox type company custom attribute on Manage Company > Manage Custom Attribute window.
     *
     * @param customAttributeLabel
     * Exact label of custom attribute
     *
     * @param checkboxOptionsList
     * List of options to be checked
     */
    editCheckboxTypeUserCustomAttributeInManageUserWindow(customAttributeLabel, checkboxOptionsList) {
        for (var index = 0; index < checkboxOptionsList.length; index++) {
            var optionValue = checkboxOptionsList[index]
            cy.get(this.#companyCustomAttributeEditCheckboxWindowCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeLabel)).parent().parent()
                .find(this.#companyCustomAttributeCheckboxWindowCss.replace('DYNAMIC_LOCATOR_VARIABLE', optionValue)).prev().check()
        }
    }

    /**
     * Save changes for custom attribute on Manage Company > Manage Custom Attribute window.
     */
    saveCustomAttributeInManageUserWindow() {
        cy.get(this.#saveCustomAttributeBtnWindowCss).click()
    }
}

export const companiesPO = new CompaniesPO()