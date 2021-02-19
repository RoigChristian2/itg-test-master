/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */
export class UsersPO {

    #searchTextBoxCss = "div[class*='search_field'] input"
    #searchBtnCss = "div[class*='search_field'] button"
    #usersTableTableDataV2Css = "table[class*='table__actionable'] > tbody > tr > td:nth-child(DYNAMIC_LOCATOR_VARIABLE) > div"
    #usersTableTableDataV1Css = "table[class*='billsTable'] > tbody > tr > td:nth-child(DYNAMIC_LOCATOR_VARIABLE) > span"
    #viewCompanyDetailBtnV2Css = "table[data-auto-container*='header-profile'] dd[data-auto-output*='info:company'] a"
    #viewCompanyDetailsBtnV1Css = "div[class*='userdetails'] div[class*='company'] a:contains('View Company Info')"
    #editUserCustomAttributeCss = "table[data-auto-container*='header-profile'] tr dd[data-auto-container*='DYNAMIC_LOCATOR_VARIABLE'] > span"
    #userCustomAttributeEditTextBoxToolTipCss = this.#editUserCustomAttributeCss + "+ div[data-auto-container*='complex-tooltip'] h4[data-auto-label*='DYNAMIC_LOCATOR_VARIABLE']+input"
    #userCustomAttributeToolTipSaveBtnCss = this.#editUserCustomAttributeCss + "+ div[data-auto-container*='complex-tooltip'] button[data-auto-action*='DYNAMIC_LOCATOR_VARIABLE:save']"
    #userCustomAttributeCheckboxToolTipCss = "table[data-auto-container*='header-profile'] tr dd[data-auto-container*='DYNAMIC_LOCATOR_VARIABLE'] > span + div[data-auto-container*='complex-tooltip']" +
        " div[class*='complex-tooltip-container'] h4[data-auto-label*='DYNAMIC_LOCATOR_VARIABLE']~div span:contains('CHECKBOX_OPTION_DYNAMIC_VARIABLE')"
    #manageUserCss = "div[class='status-tops'] a:contains('Manage User')"
    #manageUserDropdownOptionCss = "div[class='dropdown-parent'] ul > li:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #userCustomAttributeEditTextBoxWindowCss = "form[action*='customAttributesModal'] div[class*='form--field'] input[customattributekey='DYNAMIC_LOCATOR_VARIABLE']"
    #userCustomAttributeEditCheckboxWindowCss = "form[action*='customAttributesModal'] div[class*='form--field'] span:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #userCustomAttributeCheckboxWindowCss = "span:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #saveCustomAttributeBtnWindowCss = "div[class='modal-footer']  button span:contains('Save')"

    /**
     * Search for the user with 'emailAddress' and if found,
     * open 'User Details' page else throw Error for UI V2.
     *
     * @param emailAddress
     * Email Address to look for
     */
    searchUserWithEmailAndOpenUserDetailsV2(emailAddress) {
        cy.get(this.#searchTextBoxCss).type(emailAddress)
        cy.get(this.#searchBtnCss).click()
        cy.wait(5000)

        var counter = 0
        cy.get(this.#usersTableTableDataV2Css.replace('DYNAMIC_LOCATOR_VARIABLE', "5")).each(($el, index, $list) => {
            counter++
            var flag = false
            if ($el.text() === emailAddress) {
                flag = true
                cy.wrap($el).click().then(() => {
                    false
                })
            }
            if (counter == $list.length && !flag) {
                throw new Error("User with email: " + emailAddress + " not found")
            }

        })
    }

    /**
     * Search for the user with 'emailAddress' and if found,
     * open 'User Details' page else throw Error for UI V1.
     *
     * @param emailAddress
     * Email Address to look for
     */
    searchUserWithEmailAndOpenUserDetailsV1(emailAddress) {
        cy.get(this.#searchTextBoxCss).type(emailAddress)
        cy.get(this.#searchBtnCss).click()
        cy.wait(5000)

        var counter = 0
        cy.get(this.#usersTableTableDataV1Css.replace('DYNAMIC_LOCATOR_VARIABLE', "6")).each(($el, index, $list) => {
            counter++
            var flag = false
            if ($el.text() === emailAddress) {
                flag = true
                cy.wrap($el).click().then(() => {
                    false
                })
            }
            if (counter == $list.length && !flag) {
                throw new Error("User with email: " + emailAddress + " not found")
            }

        })
    }

    /**
     * Open user's comapny detail (with 'view' button).
     */
    openUserCompanyDetailsV2() {
        cy.get(this.#viewCompanyDetailBtnV2Css).click()
    }

    /**
     * Open user's comapny detail (with 'View Company Info' button).
     */
    openUserCompanyDetailsV1() {
        cy.get(this.#viewCompanyDetailsBtnV1Css).click()
    }

    /**
     * Edit text type user custom attribute on 'User Details Page'.
     *
     * @param customAttributeKey
     * Exact key of custom attribute
     *
     * @param newCustomAttributeText
     * Custom attribute value to be added in textbox
     */
    editTextTypeUserCustomAttribute(customAttributeKey, newCustomAttributeText) {

        cy.get(this.#editUserCustomAttributeCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeKey)).find('span').click()
        cy.get(this.#userCustomAttributeEditTextBoxToolTipCss.split('DYNAMIC_LOCATOR_VARIABLE').join(customAttributeKey)).clear().type(newCustomAttributeText)
        cy.get(this.#userCustomAttributeToolTipSaveBtnCss.split('DYNAMIC_LOCATOR_VARIABLE').join(customAttributeKey)).click()
    }

    /**
     * Edit checkbox type user custom attribute on 'User Details Page'.
     *
     * @param customAttributeKey
     * Exact key of custom attribute
     *
     * @param checkboxOptionsList
     * List of options to be checked
     */
    editCheckboxTypeUserCustomAttribute(customAttributeKey, checkboxOptionsList) {
        cy.get(this.#editUserCustomAttributeCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeKey)).find('span').click().then(() => {
            for (var index = 0; index < checkboxOptionsList.length; index++) {
                var optionValue = checkboxOptionsList[index]
                cy.get((this.#userCustomAttributeCheckboxToolTipCss.split('DYNAMIC_LOCATOR_VARIABLE').join(customAttributeKey)).replace('CHECKBOX_OPTION_DYNAMIC_VARIABLE', optionValue)).prev().check()
            }
        })
        cy.get(this.#userCustomAttributeToolTipSaveBtnCss.split('DYNAMIC_LOCATOR_VARIABLE').join(customAttributeKey)).click()
    }

    /**
     * Click 'dropdownOption' present under Manage User dropdown.
     *
     * @param dropdownOption
     * Dropdown option
     */
    selectOptionFromManageUserDropdown(dropdownOption) {
        cy.get(this.#manageUserCss).click()
        cy.get(this.#manageUserDropdownOptionCss.replace('DYNAMIC_LOCATOR_VARIABLE', dropdownOption)).click()
    }

    /**
     * Edit text type user custom attribute on Manage User > Manage Custom Attribute window.
     *
     * @param customAttributeKey
     * Exact key of custom attribute
     *
     * @param newCustomAttributeText
     * Custom attribute value to be added in textbox
     */
    editTextTypeUserCustomAttributeInManageUserWindow(customAttributeKey, newCustomAttributeText) {
        cy.get(this.#userCustomAttributeEditTextBoxWindowCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeKey.toUpperCase())).clear().type(newCustomAttributeText)
    }

    /**
     * Edit checkbox type user custom attribute on Manage User > Manage Custom Attribute window.
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
            cy.get(this.#userCustomAttributeEditCheckboxWindowCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeLabel)).parent().parent()
                .find(this.#userCustomAttributeCheckboxWindowCss.replace('DYNAMIC_LOCATOR_VARIABLE', optionValue)).prev().check()
        }
    }

    /**
     * Save changes for custom attribute on Manage User > Manage Custom Attribute window.
     */
    saveCustomAttributeInManageUserWindow() {
        cy.get(this.#saveCustomAttributeBtnWindowCss).click()
    }
}

export const usersPO = new UsersPO()