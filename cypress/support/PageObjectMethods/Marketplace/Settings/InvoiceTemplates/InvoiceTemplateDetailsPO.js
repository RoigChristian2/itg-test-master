/// <reference types="Cypress" />
/**
 * @author: Ankit Maheshwari
 */
class InvoiceTemplateDetailsPO {
    #settingBtnCss = "div[id='mainRegion'] section menu[data-auto-container='contextMenu:templateDetailsHeader'] > button[aria-describedby*='tooltip']"
    #editJsonBtnCss = "div[class*='ComplexTooltip'] > ul a:contains('Edit JSON')"
    #publishTemplateBtnCss = "button[data-auto-action*='editJson'] + button"
    #publishTemplateBtnOnPublishTemplateWindowCss = "button[data-auto-action='publishTemplate']"

    //Other variables
    #templateDetailsLabel="templateDetails"
    #editTemplateLabel="editTemplate"
    #editTemplatewithVJE="builder";
    #templateNameLink="span[data-testid='breadcrumb:item']";
    #titleName="label[class*='Title']";
    #localeLanguageName="span[data-auto-element='templateDetailsHeader:language']";
    #headerDiv="div[class*='sc-VigVT']";
    #readOnly="span[data-auto-label='readOnlyBadge']";
    #readOnlyAlert="div[class*='Alert__AlertContent']";
    #copyTemplateDefaultTemplate="button[data-auto-action='copyTemplatePopup']";
    #editJsonTemplate="button[data-auto-action='redirect:editJson']";
    #publishTemplate="button[data-auto-action='publishTemplateActive'] span";
    #downloadJson="button[data-auto-action='downloadJson'] span";
    #templateView='button[value="templateView"]';
    #dataAutoActionLbl = 'data-auto-action'

    /**
     * Open Json Editor.
     */
    openJsonEditor() {
        cy.url().then(url => {
            var editJsonURL = url.replace(this.#templateDetailsLabel, this.#editTemplateLabel)
            cy.visit(editJsonURL)
        })
    }

    /**
     * Publish template if not already published.
     */
    publishTemplateIfNotAlreadyPublished() {
        cy.get(this.#publishTemplateBtnCss).invoke('attr', this.#dataAutoActionLbl).then(attributeValue => {
            console.log("Here: " + attributeValue)
            if (attributeValue === 'publishTemplateActive') {
                cy.get(this.#publishTemplateBtnCss).click()
                this.clickConfirmOnPublishTemplateWindow()
            } else {
                console.log("Template is already published")
            }
        })
    }

    /**
     * Click Confirm Publish button on Publish window.
     */
    clickConfirmOnPublishTemplateWindow() {
        cy.get(this.#publishTemplateBtnOnPublishTemplateWindowCss).click()
    }

    /*
    * This function will verify a details on invoice details screens..
    *
    * @param templateName
    * templateName is name of template for which we verifying the details.
    *
    * @param locale
    * locale is specific locale for that template.
    * */
    verifyInvoiceDetailsPage(templateName, locale) {
        cy.get(this.#templateNameLink).should("contain.text", templateName);
        cy.get(this.#titleName).should("contain.text", templateName);
        cy.get(this.#localeLanguageName).should("contain.text", "Language: " + locale);
        cy.get(this.#headerDiv).then(($div) => {
            if ($div.find(this.#readOnly).text().includes("READ-ONLY")) {
                cy.get(this.#readOnlyAlert).should("contain.text", "Library templates cannot be updated.");
                cy.get(this.#copyTemplateDefaultTemplate).should("be.enabled");
            } else {
                cy.get(this.#editJsonTemplate).should("be.enabled");
                cy.get(this.#publishTemplate).should("contain.text", "Publish");
            }
            cy.get(this.#downloadJson).should("contain.text", "Download JSON")
            cy.get(this.#templateView).invoke("attr", "aria-pressed").should("contain", "true");
        });
    }

    /*
    * This function will allow to open VJE
    * */
    openVisualJsonEditor(){
        cy.get(this.#editJsonTemplate).click({force:true});
    }
}

export const invoiceTemplateDetailsPO = new InvoiceTemplateDetailsPO()