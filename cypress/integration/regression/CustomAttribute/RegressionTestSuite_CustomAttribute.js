import {loginPage} from "../../pages/generic/loginPage";
import {marketplaceSettingsPO} from "../../../support/PageObjectMethods/Marketplace/Settings/MarketplaceSettingsPO"
import {customAttributePO} from "../../../support/PageObjectMethods/Marketplace/Settings/CustomAttributePO"
import {usersPO} from "../../../support/PageObjectMethods/Marketplace/Dashboard/UsersPO";
import {validateInvoice} from "../../../support/PageObjectMethods/ProductBasedFlows/ValidateInvoice";
import {companiesPO} from "../../../support/PageObjectMethods/Marketplace/Dashboard/CompaniesPO";
import {dashboardPO} from "../../../support/PageObjectMethods/Marketplace/Dashboard/DashboardPO";
import {invoiceTemplatesListPO} from "../../../support/PageObjectMethods/Marketplace/Settings/InvoiceTemplates/InvoiceTemplatesListPO";
import {visualJsonEditorPO} from "../../../support/PageObjectMethods/Marketplace/Settings/InvoiceTemplates/VisualJsonEditorPO";
import {invoiceTemplateDetailsPO} from "../../../support/PageObjectMethods/Marketplace/Settings/InvoiceTemplates/InvoiceTemplateDetailsPO";
import {searchAndPurchaseProduct} from "../../../support/PageObjectMethods/ProductBasedFlows/SearchAndPurchaseProduct";
import {featureFlagsPage} from "../../../support/PageObjectMethods/Superuser/Settings/FeatureFlags";
import {orchardSetup} from "../../../support/PageObjectMethods/Business/Orchard";
import {authentication} from "../../../support/PageObjectMethods/Generic/Authentication";


context('Custom Attribute Testcases', () => {

    /**
     *
     * Title: Verify Company & User custom attribute should be added correctly through VJE and same should be reflected in downloaded PDF.
     *
     * Description: Below 4 testcases are covered in this test-
     * 1. Verify Company custom attribute (Input Type: Text) should be added correctly through VJE and the same should be reflected for the new invoice.
     * 2. Verify Company custom attribute (Input Type: Checkbox) should be added correctly through VJE and the same should be reflected for the new invoice.
     * 3. Verify User custom attribute (Input Type: Text) should be added correctly through VJE and the same should be reflected for the new invoice.
     * 4. Verify User custom attribute (Input Type: Checkbox) should be added correctly through VJE and the same should be reflected for the new invoice.
     *
     *      /
     *      * TO-DO:
     *      *    1. Need to add testcase to handle custom attribute tokens from Json Editor.
     *      *    2. Assertion in mock data.
     *      /
     *
     *
     * @author: Ankit Maheshwari
     */
    it('Enable pre-requsites feature flags on Enable V2 for User & Company Details page', () => {
        orchardSetup.loginAs("superuser")
        featureFlagsPage.open();
        featureFlagsPage.fetaureFlagEnableorDisableWithoutSave('Enable v2 theme for Company pages', true)
        featureFlagsPage.fetaureFlagEnableorDisableWithoutSave('Enable v2 theme for Company List pages', true)
        featureFlagsPage.fetaureFlagEnableorDisableWithoutSave('Enable v2 theme for User pages', true)
        featureFlagsPage.fetaureFlagEnableorDisableWithoutSave('Enable v2 theme for User List pages', true)
        featureFlagsPage.saveNonBillingSetting()
        authentication.logout();
    })

    it("(C38353209, C38353210, C38353212, C38353213)_VJE", () => {

        cy.fixture("TC01_CustomAttribute.json").as("testCaseVars");
        cy.get('@testCaseVars').then((testCaseVariable) => {

            //Delete existing HTML file from 'ConvertedPDF' folder
            cy.task('deleteFile', `cypress/ConvertedPDF/${testCaseVariable.Purchase_Product.convertedFileName}`)

            //Login
            loginPage.open();
            loginPage.login(Cypress.env("username"), Cypress.env("password"));

            /**
             * Custom Attribute screen: Add custom attribute, if not present.
             */
            marketplaceSettingsPO.openSettingsPage()
            marketplaceSettingsPO.openCustomAttributeScreen()

            var checkboxValues = new Map();
            checkboxValues.set("Option1", "Value1")

            //Add company custom attribute, if not exists
            customAttributePO.addCustomAttributeIfNotExists
            ("Company Custom Attributes",
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_text,
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_label_text,
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_hint_text,
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_inputType_text,
                "",
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_attributeLocation_text, ""
            )

            customAttributePO.addCustomAttributeIfNotExists
            ("Company Custom Attributes",
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_checkbox,
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_label_checkbox,
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_hint_checkbox,
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_inputType_checkbox,
                checkboxValues,
                testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_attributeLocation_checkbox, ""
            )

            customAttributePO.addCustomAttributeIfNotExists
            ("User Custom Attributes",
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_key_text,
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_label_text,
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_hint_text,
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_inputType_text,
                "",
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_attributeLocation_text, ""
            )

            customAttributePO.addCustomAttributeIfNotExists
            ("User Custom Attributes",
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_key_checkbox,
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_label_checkbox,
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_hint_checkbox,
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_inputType_checkbox,
                checkboxValues,
                testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_attributeLocation_checkbox, ""
            )

            /**
             * Custom Attribute definition: Define actual values of custom attributes on User Details page & Company Details page
             */
            dashboardPO.navigateToDashboard()

            //Add custom attribute value at User Details page
            dashboardPO.openUserDetailsScreen()
            usersPO.searchUserWithEmailAndOpenUserDetailsV2(Cypress.env("username"))
            usersPO.editTextTypeUserCustomAttribute(testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_key_text, testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_definitionValue_text)
            usersPO.editCheckboxTypeUserCustomAttribute(testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_key_checkbox, [testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_definitionKey_checkbox])

            //Add custom attribute value at Company Details page
            usersPO.openUserCompanyDetailsV2()
            companiesPO.editTextTypeCompanyCustomAttribute(testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_text, testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_definitionValue_text)
            companiesPO.editCheckboxTypeCompanyCustomAttribute(testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_checkbox, [testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_definitionKey_checkbox])

            /**
             * Visual Json Editor: Open template and add custom attribute tokens on it.
             */
            //Create template if not already present
            marketplaceSettingsPO.openSettingsPage()
            marketplaceSettingsPO.openInvoiceTemplateScreen()
            invoiceTemplatesListPO.copyTemplateIfNotExists(testCaseVariable.Invoice_Template.templateName, testCaseVariable.Invoice_Template.templateLocale, '', true, false)
            invoiceTemplatesListPO.openTemplateDetailsPage(testCaseVariable.Invoice_Template.templateName, testCaseVariable.Invoice_Template.templateLocale)

            //Open Json Editor and add tokens
            invoiceTemplateDetailsPO.openVisualJsonEditor()
            visualJsonEditorPO.expandTokenLookup()
            visualJsonEditorPO.selectTokenWithCategory('USER DETAILS', testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_text)
            visualJsonEditorPO.addCustomAttributeTokenAtBody("Customer", "User", testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_key_text, "customertitle", ' UT->', false);
            visualJsonEditorPO.goBackToPreviousPage();
            visualJsonEditorPO.goBackToMainSection("Body");
            visualJsonEditorPO.expandTokenLookup()
            visualJsonEditorPO.selectTokenWithCategory('USER DETAILS', testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_checkbox)
            visualJsonEditorPO.addCustomAttributeTokenAtBody("Customer", "User", testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_key_checkbox, "customerparagraph", ' UC->', false);
            visualJsonEditorPO.goBackToPreviousPage();
            visualJsonEditorPO.goBackToMainSection("Body");
            visualJsonEditorPO.expandTokenLookup()
            visualJsonEditorPO.selectTokenWithCategory('USER DETAILS', testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_checkbox)
            visualJsonEditorPO.addCustomAttributeTokenAtBody("Customer", "Company", testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_checkbox, "customertitle", ' CompanyCheckbox->', true);
            visualJsonEditorPO.goBackToPreviousPage();
            visualJsonEditorPO.goBackToMainSection("Body");
            visualJsonEditorPO.expandTokenLookup()
            visualJsonEditorPO.selectTokenWithCategory('USER DETAILS', testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_text)
            visualJsonEditorPO.addCustomAttributeTokenAtBody("Customer", "Company", testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_key_text, "sellerparagraph", 'CT->', false);
            visualJsonEditorPO.publishTemplate()

            /**
             * Invoice Creation: Place an order and generate the invoice also convert that Invoice PDF into HTML
             */
            searchAndPurchaseProduct.searchProductAndSelectProduct(testCaseVariable.Purchase_Product.productName)
            searchAndPurchaseProduct.clickBuyNowOnAppOverviewAndUpdateEditionOfProduct(testCaseVariable.Purchase_Product.editionName, testCaseVariable.Purchase_Product.additionalUserCount)
            //This must be un-commented, if Order Custom attribute exists
            // searchAndPurchaseProduct.clickContinueOnAdditionalInformationTab()
            searchAndPurchaseProduct.clickContinueOnBillingDetailsTab()
            searchAndPurchaseProduct.clickPlaceOrderOnConfirmOrderTab()
            searchAndPurchaseProduct.downloadInvoiceFromOrderIDAndConvertToHTMLFormat(testCaseVariable.Purchase_Product.convertedFileName)
        })
    })

    /**
     * This testcase will verify custom attribute values in downloaded Invoice (Depends On-> (C38353209, C38353210, C38353212, C38353213)_VJE).
     *
     * @author: Ankit Maheshwari
     */
    it('Verify Invoice PDF Content for (C38353209, C38353210, C38353212, C38353213)_VJE', () => {
        cy.fixture("TC01_CustomAttribute.json").as("testCaseVars");
        cy.get('@testCaseVars').then((testCaseVariable) => {
            Cypress.config('baseUrl', '')
            cy.visit(`cypress/ConvertedPDF/${testCaseVariable.Purchase_Product.convertedFileName}`)

            //Verify user custom attributes at customer section
            validateInvoice.verifyTextPresentInConvertedInvoice('BILL TO', `UT->${testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_definitionValue_text}`)
            validateInvoice.verifyTextPresentInConvertedInvoice('@appdirect', `UC->${testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_definitionValue_checkbox}`)

            //Verify company custom attributes at seller section
            validateInvoice.verifyTextPresentInConvertedInvoice('CompanyCheckbox', `CompanyCheckbox->${testCaseVariable.Custom_Attributes.User_Custom_Attribute.customAttribute_definitionValue_text}`)
            validateInvoice.verifyTextPresentInConvertedInvoice('| CT', `CT->${testCaseVariable.Custom_Attributes.Company_Custom_Attribute.customAttribute_definitionValue_text}`)
        })
    })
})
