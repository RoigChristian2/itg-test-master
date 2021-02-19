/// <reference types ="Cypress" />
/**
 * @author: Jai
 */
export class templateDetailsPage {
    url = "/channel/settings/invoiceTemplates/templateDetails/";
    alert = "[data-auto-output='defaultTemplateAlert']";
    copyTemplateBtn = "[data-auto-action='copyTemplatePopup']";
    templateNameLbl = '.sc-gZMcBi';
    readOnlyLbl = "[data-auto-label='readOnlyBadge']";
    languageLbl = "[data-auto-element='templateDetailsHeader:language']";
    publishedLbl = "[data-auto-element='status:templateDetailsHeader']";
    templatePreviewLbl = "[data-auto-label='previewSectionHeading']";
    templateBtn = "[value='templateView']";
    pdfBtn = "[value='pdfView']";
    downloadJsonBtn = "[data-auto-action='downloadJson']";
    //Context menu
    expandMenu = "[data-auto-action='context-menu-trigger']"
    renameLink = "[data-auto-action='templateRename']"
    copyTemplateLink = "[data-auto-action='templateCopy']"
    editJSONLink = "[data-auto-action='redirect:editJSON']"
    //copy Template pop-up
    copyTemplateDiv = "[data-auto-container='copyTemplateModal']"
    publishTemplateCb = "[data-testid='checkbox:input']"
    createCopyBtn = "[data-auto-action='createCopy']"
    cancelBtn = "[data-auto-action='cancel:copyTemplate']"
    templateNameTxt = '.sc-dnqmqq'
    //newly copied template
    templateLink = "[data-auto-action='redirect:copiedTemplate']"



    open(templateName){
        cy.visit(this.url+templateName);
        cy.get(this.copyTemplateBtn).should('be.visible');
    }

    copyDefaultTemplate(newTemplateName, publishTemplate){
        cy.get(this.copyTemplateBtn).click();
        if (newTemplateName !== "") {
            cy.get(this.templateNameTxt).clear({force:true})
            cy.get(this.templateNameTxt).type(newTemplateName)
        }
        if(publishTemplate){
            cy.get(this.publishTemplateCb).click({force:true})
        }
        cy.get(this.createCopyBtn).click()
        return cy.get(this.templateLink).invoke('text');
    }

    getRandomString() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

}
export const templateDetails = new templateDetailsPage();