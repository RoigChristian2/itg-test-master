import {loginPage} from "../../pages/generic/loginPage";
import {invoiceTemplates} from "../../pages/marketplace/settings/invoiceTemplates";
import {templateDetails} from "../../pages/marketplace/settings/templateDetails";
import {invoiceSettings} from "../../pages/marketplace/settings/invoiceSettings";
import {invoices} from "../../pages/account/billing/invoices";
import {billingFunctionality} from "../../pages/marketplace/settings/billingFunctionality";
import {marketplaceSettingsPO} from "../../../support/PageObjectMethods/Marketplace/Settings/MarketplaceSettingsPO"
import {generalSettingsPO} from "../../pages/marketplace/settings/GeneralSettingsPO";


context('Invoice Template management', () =>{
    /*
    Owner: Jai
    Title: Verify main landing and default template details page
    Test Description:
        Login as  Marketplace manager and go to Invoice Templates page and verify the page details
        Apply filters using and open Default template
        Verify controls present On Template details page
    */
    it("C38314562", () =>{
        loginPage.open();
        loginPage.login(Cypress.env("username"), Cypress.env("password"));
        invoiceTemplates.open();
        cy.get(invoiceTemplates.addTemplateButton).should("exist");
        //verify add custom template panel
        cy.get(invoiceTemplates.customTemplateJSONStructureBtn).should("exist");
        cy.get(invoiceTemplates.customTemplateAddTemplateBtn).should("exist");
        cy.get(invoiceTemplates.customTemplateLearnMoreLink).should("exist");
        cy.get(invoiceTemplates.customTemplateDiv).find('h2').contains('Add custom templates').should('be.visible');

        //view default templates
        invoiceTemplates.showFilers();
        invoiceTemplates.selectTemplateType("Default Template");
        invoiceTemplates.openTemplate("Appdirect Template_ES");
        //verify template details page
        cy.get(templateDetails.readOnlyLbl).should('have.text','READ-ONLY');
        cy.get(templateDetails.languageLbl).should('have.text', 'Language: Español');
        cy.get(templateDetails.alert).should('have.text', "Library templates cannot be updated. Copy the template to start customizing.")
        cy.get(templateDetails.copyTemplateBtn).should('be.visible');
        cy.get(templateDetails.templatePreviewLbl).should('be.visible');
        cy.get(templateDetails.templateBtn).should('be.visible');
        cy.get(templateDetails.pdfBtn).should('be.visible');
        cy.get(templateDetails.downloadJsonBtn).should('be.visible');
        loginPage.logout();
    })

    /*
    Owner: Jai
    Title: To verify the filters on ITG main landing page
    Test Description:
        Login as Marketplace manager and go to Invoice Templates page
        Sort Templates using filter functionality
        Reload page and verify filter is reset i.e. it should not have values previously selected
    */
    it("C38314715", () =>{
        loginPage.open();
        loginPage.login(Cypress.env("username"), Cypress.env("password"));
        invoiceTemplates.open();
        invoiceTemplates.showFilers();
        invoiceTemplates.selectLanguage("English (United States)");
        invoiceTemplates.selectTemplateType("Default Template");
        invoiceTemplates.selectStatus("Not Active");

        cy.get("[data-auto-container='templates:list']").find('table').find('tr').contains('Appdirect Template_EN_US')
            .parent().contains('English (United States)').parent().contains('Inactive');
        //reload page and verify filters is not displayed
        cy.reload();
        cy.get("[data-auto-input='select:language']").should('not.exist');
        loginPage.logout();
    })

    /*
    Owner: Jai
    Title: Verify the logo displayed on Default template and copied template are same as set in invoice settings and copied template should have correct details
    Test Description:
        Login as Marketplace manager and go to Marketplace > Settings >Billing Settings>Invoice Settings page
        Go to Marketplace > Settings >Billing Settings>Invoice Templates page and open any default template and verify the Logo image
    */
    it("C38314734", () =>{
        const imageUrl = "https://ddds010i915yc.cloudfront.net/albums/a8146c74-a0ed-4d55-8ce4-d2127319d7df/13bcb402-c020-471d-8116-08ed42815287"
        loginPage.open()
        loginPage.login(Cypress.env("username"), Cypress.env("password"))

        //clear is not able to clear input box
        /*invoiceSettings.open()
        cy.get(invoiceSettings.invoiceLogoURL).clear({force:true})
        cy.get(invoiceSettings.invoiceLogoURL).type(imageUrl)
        invoiceSettings.clickSaveBtn();*/

        //open the existing invoice and verify image
        invoices.open();
        invoices.clickTableRowByRowNumber(1);
        invoices.verifyLogo(imageUrl)

        //copy active template and check above image remain same for copied template
        invoiceTemplates.open();
        invoiceTemplates.showFilers();
        invoiceTemplates.selectLanguage("English (United States)");
        invoiceTemplates.selectTemplateType("Default Template");
        cy.get(invoiceTemplates.templateTable).find('tr').find('td').contains('English (United States)').click();

        //copy template from template details page
        let templateName = cy.get(templateDetails.templateNameLbl).invoke('text')
        let newTemplateName = templateDetails.copyDefaultTemplate(templateDetails.getRandomString(), true)

        //Go back to invoice page and verify image for existing invoice
        invoices.open();
        invoices.clickTableRowByRowNumber(1);
        invoices.verifyLogo(imageUrl)
    })

    /*
    Owner: Jai
    Title: Verify the newly added invoice navigation links
    Test Description:
        Login as Marketplace manager and go to Marketplace > Settings >Billing Settings page
        Verify links present in left navigation
        - Billing Functionality
        - Invoice settings
        - Invoice Templates
    */
    it.only("C38314720", () =>{
        loginPage.open()
        loginPage.login(Cypress.env("username"), Cypress.env("password"))

        generalSettingsPO.open()
        //verify Billing Functionality left nav
        marketplaceSettingsPO.clickLeftNav(marketplaceSettingsPO.billingFunctionality)
        billingFunctionality.verifyHeader();

        //verify Invoice Settings left nav
        marketplaceSettingsPO.clickLeftNav(marketplaceSettingsPO.invoiceSettings)
        invoiceSettings.verifyHeader();

        //verify Invoice Template left nav
        marketplaceSettingsPO.clickLeftNav(marketplaceSettingsPO.invoiceTemplates)
        invoiceTemplates.verifyHeader();
    })
})




