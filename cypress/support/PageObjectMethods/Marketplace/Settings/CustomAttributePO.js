/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */
export class CustomAttributePO {

    //Locators
    #rootPageCss = "div[id='main']"
    #customAttributeCss = "a[href$='custom-attributes']";
    #customAttributeTypeHeader = "div > h2:contains('DYNAMIC_LOCATOR_VARIABLE')";
    #customAttributeTypeCss = "div > h2:contains('DYNAMIC_LOCATOR_VARIABLE') + menu > button"
    #customAttributeKeyInTable = "div[class*='js-custom-attribute-list'] tr > td:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #keyTextBoxCss = "input[name*='attributeKey']"
    #labelTextBoxCss = "label[for*='label'] + span input"
    #hintTextBoxCss = "label[for*='hint'] + span input"
    #inputTypeDropdownCss = "label:contains('Input Type') + div select"
    #checkboxesOptionsTableCss = "tbody[class*='region-inputs']"
    #addCheckboxOptionBtnCss = "div[class*='custom-attributes-options-list'] button[class*='add-button']"
    #addOptionBtnCss = "div[class*='custom-attributes-options-list'] button[class*='add-button']"
    #addOptionKeyCss = "div[class*='custom-attributes-options-list'] input[class*='row--item_content']"
    #addOptionValueCss = "div[class*='custom-attributes-options-list'] input[class*='option-key']"
    #selectLocationBtnCss = "div[class*='custom-attributes-locations-list'] button"
    #selectLocationDropdownCss = "div[data-component*='CustomAttributesPermissionsWrapper'] select"
    #permissionTable = "div[data-component*='CustomAttributesPermissionsWrapper'] table"
    #columnsInPermissionTableCss = this.#permissionTable + " tbody > tr > td:nth-child(DYNAMIC_LOCATOR_VARIABLE)"
    #saveBtnCss = "button[aria-label*='save'] span:contains('Save Changes')"

    //Other variables
    #TEXT_LABEL = "Text"
    #CHECBOX_LABEL = "Checkboxes"
    #ERROR_MSG_LOCATOR = " div[class*='js-alert'] div[class*='js-content'] p"

    /**
     * Click 'Add Attribute' button.
     *
     * @param customAttributeType
     * Custom attribute type (e.g. Company Custom Attributes, User Custom Attributes etc.)
     */
    clickAddCustomAttributeBtn(customAttributeType) {
        cy.get(this.#customAttributeTypeCss.replace("DYNAMIC_LOCATOR_VARIABLE", customAttributeType)).click();
    }

    /**
     * Add new custom attribute.
     *
     * @param key
     * Custom attribute key.
     *
     * @param label
     * Custom attribute label.
     *
     * @param hint
     * Custom attribute hint.
     *
     * @param inputType
     * Custom attribute inputType (Text or Checkboxes).
     *
     * @param checkboxOptionsValuesMap (For now it only support one 'key:value' pair)
     * Map, containing option & value
     *
     * @param attributeLocation
     * Location of custom attribute (e.g. Company Signup, My Company Page etc.)
     */
    fillCustomAttributeFields(key, label, hint, inputType, checkboxOptionsValuesMap, attributeLocation) {
        cy.get(this.#keyTextBoxCss).type(key)
        cy.get(this.#labelTextBoxCss).type(label)
        cy.get(this.#hintTextBoxCss).type(hint).then(() => {
            if (inputType.includes("Text")) {
                cy.get(this.#inputTypeDropdownCss).select(this.#TEXT_LABEL)
            }
            // TO-DO: Handle mutiple checkbox conditions
            else if (inputType.includes("Checkboxes")) {
                cy.get(this.#inputTypeDropdownCss).select(this.#CHECBOX_LABEL)
                if (checkboxOptionsValuesMap.size > 0) {
                    // for (const [option, value] of checkboxOptionsValuesMap.entries()) {
                    //     cy.get(this.#addOptionKeyCss).type(option)
                    //     cy.get(this.#addOptionValueCss).type(value)
                    //     /**
                    //      * TO-DO: Add support to handle multiple key-value pairs
                    //      */
                    // }
                    checkboxOptionsValuesMap.forEach((value, key) => {
                        cy.get(this.#addOptionKeyCss).type(key)
                        cy.get(this.#addOptionValueCss).type(value)

                        /**
                         * TO-DO: Add support to handle multiple key-value pairs
                         */
                    })
                } else {
                    throw new Error("'checkboxOptionsValuesMap' should not be blank")
                }
            } else {
                throw new Error("No Such InputType exists " + inputType)
            }
        })
        cy.get(this.#selectLocationBtnCss).click()
        cy.get(this.#selectLocationDropdownCss).select(attributeLocation)
    }

    /**
     * This method will check whether a custom attribute with same key exists or not,
     * if not it will click on 'Add Attribute' button and create new custom attribute.
     *
     * @param customAttributeType
     * Custom attribute type (e.g. Company Custom Attributes, User Custom Attributes etc.)
     *
     * @param key
     * Custom attribute key.
     *
     * @param label
     * Custom attribute label.
     *
     * @param hint
     * Custom attribute hint.
     *
     * @param inputType
     * Custom attribute inputType (Text or Checkboxes).
     *
     * @param checkboxOptionsValuesMap
     * Map, containing option & value
     *
     * @param attributeLocation
     * Location of custom attribute (e.g. Company Signup, My Company Page etc.)
     *
     * @param permissionList
     * Array of permissions list (if required, else pass blank)
     * (e.g.
     * var permission1 = ['Reseller', true, false, true]
     * var permission2 = ['Sales Support', false, true, false]
     * var permissionList = [permission1, permission2])
     */
    addCustomAttributeIfNotExists(customAttributeType, key, label, hint, inputType, checkboxOptionsValuesMap, attributeLocation, permissionList) {
        cy.get(this.#customAttributeTypeHeader.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeType)).parent().parent().then(($el) => {
            if ($el.find(this.#customAttributeKeyInTable.replace('DYNAMIC_LOCATOR_VARIABLE', key)).length == 0) {
                this.clickAddCustomAttributeBtn(customAttributeType)
                this.fillCustomAttributeFields(key, label, hint, inputType, checkboxOptionsValuesMap, attributeLocation)

                if (permissionList.length > 0) {
                    let role, viewFlag, editFlag, requiredFlag
                    for (var i = 0; i < permissionList.length; i++) {
                        var permissionRow = permissionList[i]
                        role = permissionRow[0]
                        viewFlag = permissionRow[1]
                        editFlag = permissionRow[2]
                        requiredFlag = permissionRow[3]
                        this.givePermissionForCustomAttribute(role, viewFlag, editFlag, requiredFlag)
                    }
                } else {
                    console.log('No Permission is provided')
                }
                this.saveCustomAttribute()
            } else {
                console.log(`Custom Attribute ${customAttributeType} with Key ${key} already exists`)
            }
        })
    }

    /**
     * Give permission to different roles in attribute location.
     *
     * @param role
     * Role name (e.g. Reseller, Sales Support etc.)
     *
     * @param viewFlag
     * View permission flag
     *
     * @param editFlag
     * Edit permission flag
     *
     * @param requiredFlag
     * Required permission flag
     */
    givePermissionForCustomAttribute(role, viewFlag, editFlag, requiredFlag) {
        var rolePresent = false
        cy.get(this.#columnsInPermissionTableCss.replace("DYNAMIC_LOCATOR_VARIABLE", "1")).each(($el, index, $list) => {
            if ($el.text() === role) {
                if (viewFlag) {
                    cy.get(this.#columnsInPermissionTableCss.replace("DYNAMIC_LOCATOR_VARIABLE", "2") + " input").eq(index).click()
                }
                if (editFlag) {
                    cy.get(this.#columnsInPermissionTableCss.replace("DYNAMIC_LOCATOR_VARIABLE", "3") + " input").eq(index).click()
                }
                if (requiredFlag) {
                    cy.get(this.#columnsInPermissionTableCss.replace("DYNAMIC_LOCATOR_VARIABLE", "4") + " input").eq(index).click()
                }
                rolePresent = true

                //TO-DO: Break the loop pre-prematurely, if condition met
                // return false;
            }
        }).then(() => {
            if (!rolePresent) {
                throw new Error("No Such Role Exists " + role)
            }
        })
    }

    /**
     * Save custom attribute.
     */
    saveCustomAttribute() {
        cy.get(this.#saveBtnCss).click()
        cy.wait(2000)

        cy.get(this.#rootPageCss).then($element => {
            if ($element.find(this.#ERROR_MSG_LOCATOR).is(':visible')) {
                throw new Error("Custom Attribute with same key already exists.")
            }
        });
        // cy.waitForXHRForSpecifiedTime(this.#saveCustomAttributeXHR, "saveCustomAttribute", 20000)
    }
}

//Export statement
export const customAttributePO = new CustomAttributePO()