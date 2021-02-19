/// <reference types ="Cypress" />

import {authentication} from "../Generic/Authentication";
import {featureFlagsPage} from "../Superuser/Settings/FeatureFlags";
    import {marketPlaceRoles} from "../Marketplace/Settings/Role";
/**
 * @author: Kusum Khandelwal
 * This class going to use to enable , disable flag based on functionlality.
 */

export class OrchardSetup{

    /*This function will use to login with a specific type of user.
    * @param userNameType
    *       userType eg. superuser, channeladmin, reseller
    * */
    loginAs(userNameType){
        cy.fixture("envInfo.json").as("env");
        cy.get("@env").then((env) => {
            authentication.open();
            if(userNameType=="superuser") {
                authentication.login(env.Orchard.Superuser.Username, env.Orchard.Superuser.Password);
            }
            else if(userNameType=="channeladmin"){
                authentication.login(env.Orchard.channelAdmin.Username, env.Orchard.channelAdmin.Password);
            }
        });
    }

    /*
    * This function will use to enable invoice template for  channel-admin, reseller user.
    */
    invoiceV2Setup(){
        featureFlagsPage.fetaureFlagEnableorDisable("Account Invoice v2",true);
        cy.waits();
        featureFlagsPage.fetaureFlagEnableorDisable("Admin Invoice v2",true);
        cy.waits();
        featureFlagsPage.fetaureFlagEnableorDisable("Invoice Builder (Marketplace)",true);
        cy.waits();
    }

    /**
    * This function will use to  enable reseller related flag under superuser->feature flag.*
    *To enable reseller invoice template , first need to true invoiceV2 setup.
    */
    resellerInvoiceSetup(){
        featureFlagsPage.fetaureFlagEnableorDisable("Allow Resellers to define Invoice Templates",true);
    }

    /**
     * This function will use to  enable marketplace->setting->role   reseller invoicebuilder flag.*
     *To enable reseller invoice template , first need to true invoiceV2,resellerInvoiceSetup setup.
     */
    enableMarketPlaceRole(){
        marketPlaceRoles.marketplaceSetting("Roles");
        marketPlaceRoles.marketPlaceRoleSettingEnableDisable("Invoice Builder",true);
    }
}

export const orchardSetup = new OrchardSetup();