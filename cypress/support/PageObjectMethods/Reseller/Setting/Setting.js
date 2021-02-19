/// <reference types ="Cypress" />
/**
 *@author :Kusum Khandelwal
 * This class is going to use to perform multiple task on reseller->setting page..
 */

export class SettingPage {

    #settingLink="a[href='./settings']";
    #resellerInvoiceLink="[data-auto='RESELLER_INVOICE_TEMPLATES'] > .adb-link__nav";

    /*
    * This function will allow to select Invoice template for reseller user by clicking on invoice link under setting of reseller.
    *
    * */
    resellerInvoicePageLink() {
        cy.get(this.#settingLink).click({force:true});
        cy.get(this.#resellerInvoiceLink).click();
    }
}

export const resellerSetting = new SettingPage();