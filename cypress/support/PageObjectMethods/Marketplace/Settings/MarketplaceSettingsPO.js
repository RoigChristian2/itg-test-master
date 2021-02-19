/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */
export class MarketplaceSettingsPO {
    leftNav_holder = "[id='channelMenu']"
    //left navigation links for Marketplace - settings (/channel/settings)
    //Settings
    generalSettings = "General Settings"
    developers = "Developers"
    marketplaceFunctionality = "Marketplace Functionality"
    roles = "Roles"
    assistedSales = "Assisted Sales"
    security = "Security"
    usageAnalyticsAccounts = "Usage Analytics Accounts"
    //Billing Settings
    billingFunctionality = "Billing Functionality"
    paymentGateway = "Payment Gateway"
    invoiceSettings = "Invoice Settings"
    invoiceTemplates = "Invoice Templates"
    //CUSTOM UI
    fAQs = "FAQs"
    customerNotifications = "Customer Notifications"
    customAttributes = "Custom Attributes"
    translations = "Translations"
    //INTEGRATION
    apiClients = "API Clients"
    Migration = "Migration"
    Webhooks = "Webhooks"
    Microsoft = "Microsoft"
    Google = "Google"
    //DATA SYNC
    syncSettings = "Sync Settings"
    //MOBILE MARKETPLACE
    Branding = "Branding"

    //Locators
    #customAttributeLinkCss="a[href$='custom-attributes']";
    #invoiceTemplateLinkCss="a[href$='invoice-templates']";

    //Other variables
    #settingURL = "/channel/settings"
    #loadCustomAttributeXHR = "/api/channel/internal/v2/customAttributeDefinitions"

    /**
     * Open Marketplace > Settings page.
     */
    openSettingsPage() {
        cy.visit(this.#settingURL)
    }

    /*
    click on left nav link
     */
    clickLeftNav(leftNav){
        cy.get(this.leftNav_holder).find('a').contains(leftNav).click({force:true})
        cy.wait(1000);
    }

    /**
     * Open 'Custom Attributes' page.
     */
    openCustomAttributeScreen() {
        cy.get(this.#customAttributeLinkCss).click()
        cy.waitForXHRForSpecifiedTime(this.#loadCustomAttributeXHR, "loadCustomAttributePage", 20000)
    }

    /**
     * Open 'Invoice Templates' page.
     */
    openInvoiceTemplateScreen() {
        cy.get(this.#invoiceTemplateLinkCss).click()
    }
}

export const marketplaceSettingsPO = new MarketplaceSettingsPO()