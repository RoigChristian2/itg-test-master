/*
* @author :kusum khandelwal
*This class is testClass where we define all testcase related to Reseller.
* */

import {authentication} from "../../../support/PageObjectMethods/Generic/Authentication";
import {orchardSetup} from "../../../support/PageObjectMethods/Business/Orchard";
import {resellerSetting} from "../../../support/PageObjectMethods/Reseller/Setting/Setting";
import {featureFlagsPage} from "../../../support/PageObjectMethods/Superuser/Settings/FeatureFlags";
import {invoiceTemplateDetailsPO} from "../../../support/PageObjectMethods/Marketplace/Settings/InvoiceTemplates/InvoiceTemplateDetailsPO";
import {invoiceTemplatesListPO} from "../../../support/PageObjectMethods/Marketplace/Settings/InvoiceTemplates/InvoiceTemplatesListPO";

context("Reseller Template Management",()=>{

   before("Reseller Prerequisite",()=>{
       orchardSetup.loginAs("superuser")
       featureFlagsPage.open();
       orchardSetup.invoiceV2Setup()
       orchardSetup.resellerInvoiceSetup();
       authentication.logout();
       orchardSetup.loginAs("channeladmin");
       orchardSetup.enableMarketPlaceRole();
       authentication.logout();
    });

   /*
   * @owner:Kusum Khandelwal
   * Title: Verify reseller is able to access invoice template screen once 'Allow Resellers to define Invoice Templates' flag is enabled
   *Test Description: Verify the functionality of default template details page for reseller invoice template.
   *
   */
    it("C38351741",()=>{
        cy.fixture("envInfo.json").as("env");
        cy.get("@env").then((env) => {
            authentication.open();
            authentication.login(env.Orchard.Reseller.Username, env.Orchard.Reseller.Password);
        });
        resellerSetting.resellerInvoicePageLink();
        invoiceTemplatesListPO.verifyInvoiceTemplatePage();
        invoiceTemplatesListPO.selectTemplate("Appdirect Template_DA","Dansk");
        invoiceTemplateDetailsPO.verifyInvoiceDetailsPage("Appdirect Template_DA","Dansk");
    });
});