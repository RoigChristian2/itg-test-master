/// <reference types ="Cypress" />
/**
 * @author: Jai
 */
export class addTemplatePage {
    url = "/channel/settings/invoiceTemplates/addTemplates";
    header = ":nth-child(2) > .Title-sc-1791ddr-0";

    nameTxt = '#addTemplateName';
    languageDD = "[data-auto-input='list:language']";
    uploadImageBtn = "[data-auto-action='upload:image']";
    prviewPDFBtn = "[data-auto-action='addTemplate:templatePreviewMockDataView']";
    validateBtn = "[data-auto-action='addTemplate:validateJson']";
    jsonBtn = "[data-auto-action='addTemplate:jsonView']";
    templateBtn = "[data-auto-action='addTemplate:templatePreviewView']";
    createTemplateBtn = "[data-auto-action='createTemplate']";
    CancelBtn = "[data-auto-action='cancel:addTemplate']";
    validateLink = '.sc-kkGfuU > a';
    invoiceBuilderDocLink = "[data-auto-action='redirect:invoiceBuilder']";


    open(){
        cy.visit(this.url);
        cy.get(this.nameTxt).should('be.visible');
    }
    verifyHeader(){
        cy.get('label').contains('New Template').should('be.visible');
    }
}
export const addTemplate = new addTemplatePage();