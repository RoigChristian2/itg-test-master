/// <reference types ="Cypress" />
/**
 * @author: Jai
 */
export class invoiceTemplatesPage {
    url = "/channel/settings/invoiceTemplates";
    header = "[data-auto-label='invoiceTemplateTitle']";
    addTemplateButton = "[data-testid='add-template-button']";
    showFilterButton = '.HRnVa > span';
    searchBox = "[name='search']";
    languageDropDown = "[data-auto-input='select:language']";
    templateTypeDropDown = "[data-auto-input='select:templateType']";
    statusDropDown = "[data-auto-input='select:status']";
    //custom template
    customTemplateDiv = "[data-auto-container='customTemplate']"
    customTemplateJSONStructureBtn = "[data-auto-action='downloadFile:templateJson']"
    customTemplateAddTemplateBtn = "[data-auto-action='redirect:createNewTemplateBottom']"
    customTemplateLearnMoreLink = "[data-auto-action='redirect:learnMore']"
    //Template table
    templateTable = "[data-auto-container='templates:list']"

    open(){
        cy.visit(this.url);
        cy.get(this.header).should('have.text', 'Invoice Templates');
    }

    verifyHeader(){
        cy.get(this.header).should('have.text','Invoice Templates');
    }

    clickAddTemplateButton(){
        cy.get(this.addTemplateButton).click();
        //cy.get("[id='addTemplateName']").should('have.type', 'text');  //redirect to new page /channel/settings/invoiceTemplates/addTemplates - this asset should be on addTemplates page
    }

    search(searchParams){
        cy.get(this.searchBox).type(searchParams);
    }

    showFilers(){
        cy.get(this.showFilterButton).click({force:true});
        cy.wait(1000);
    }

    selectLanguage(language){
        cy.get(this.languageDropDown).select(language);
        cy.wait(1000);
    }

    selectTemplateType(templateType){
        cy.get(this.templateTypeDropDown).select(templateType,{force:true});
        cy.wait(1000);
    }

    selectStatus(status){
        cy.get(this.statusDropDown).select(status);
        cy.wait(1000);
    }

    openTemplate(templateName){
        cy.get(this.templateTable).find('table').find('tr').contains(templateName).click();
        cy.get('.sc-gZMcBi').should('have.text', templateName);
    }



}

export const invoiceTemplates = new invoiceTemplatesPage();