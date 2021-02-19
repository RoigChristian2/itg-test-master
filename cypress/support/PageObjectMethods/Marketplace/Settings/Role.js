/*
Owner: Kusum Khandelwal
*/

/// <reference types ="Cypress" />
/*
* @author: kusum khandelwal
*This class is to use enable and disable the marketplace role.
*
*/

export class marketPlaceRolesPage {
    url = "/channel/settings";
    #saveSettingButton = "button[class*='adb-button adb-toolbar']";
    #confirmMessageLocator = "div[class*='adb-local_alert--content'] p";
    #confirmMessage = "Your settings have been saved successfully."
    #sidemenu = "ul [class*='adb-stack'] a:contains('DYNAMIC_LOCATOR_VALUE')";
    #flag = "section[class*='js-permissions-container'] h4:contains('DYNAMIC_LOCATOR_VALUE') ";
    #toggle_Button="td span[class='adb-toggle--value']";

    /*
        * This function will allow to select role for channel admin under setting .
        * @sideMenuItem
        * This will sidemenuitem under marketplace->settings->Settings
        * */

    marketplaceSetting(sideMenuItem){
        cy.visit(this.url);
        cy.get(this.#sidemenu.replace("DYNAMIC_LOCATOR_VALUE", sideMenuItem)).click({force: true});
        cy.waits();
    }

        /*
        * This function will allow to enable or disable of marketplace role..
        * @flagName
        * This will the flag for which we are going to enable or disable the role.
        * @flagValue
        * value of the flag either true, false
        * */

    marketPlaceRoleSettingEnableDisable(flagName,flagValue) {
        cy.get(this.#flag.replace("DYNAMIC_LOCATOR_VALUE", flagName)).parent().parent('tr').as("Row");
        if(flagValue){
            cy.get('@Row').find(this.#toggle_Button).then(($value)=>{
                cy.log($value);
                if(!($value.text()=='Enabled')){
                    cy.get("@Row").find(this.#toggle_Button).click({force:true});
                    cy.get(this.#saveSettingButton).click({force:true}).then(()=>{
                        cy.get(this.#confirmMessageLocator).should("contain",this.#confirmMessage);
                    });
                }
            });
        }else if(!flagValue){
                cy.get('@Row').find(this.#toggle_Button).then(($value)=>{
                cy.log($value);
                if($value.text()=='Enabled'){
                    cy.get("@Row").find(this.#toggle_Button).click({force:true});
                    cy.get(this.#saveSettingButton).click({force:true}).then(()=>{
                        cy.get(this.#confirmMessageLocator).should("contain",this.#confirmMessage);
                    });
                }
            });
        }
    }
}

export const marketPlaceRoles = new marketPlaceRolesPage();