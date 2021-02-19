/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */
class InvoiceTemplatesListPO {

    //Locators
    #searchTextBoxCss = "div[data-auto-input='searchField:templateName'] input[placeholder='Search']"
    #searchBtnTextBoxCss = "div[data-auto-input='searchField:templateName'] button"
    #showFiltersBtnCss = "div[class*='ContainerWrapper'] button[data-auto-action*='filters:toggle'] > span:contains('Show Filters')"
    #hideFiltersBtnCss = "div[class*='ContainerWrapper'] button[data-auto-action*='filters:toggle'] > span:contains('Hide Filters')"
    #filterConditionCss = "div[data-auto-container*='filters'] div:contains('DYNAMIC_LOCATOR_VARIABLE') + div > select"
    #invoiceTemplatesListTableCss = "div[class*='TableContainer'] > table";
    #invoiceTemplateListTableColumnsCss = this.#invoiceTemplatesListTableCss + " > tbody > tr > td:nth-child(DYNAMIC_LOCATOR_VARIABLE)"
    #invoiceTemplateOptionsBtnInTemplateListTableCss = this.#invoiceTemplateListTableColumnsCss + " button"
    #copyTemplateWindowNameTextBoxCss = "h3:contains('Copy Template') + div input[type='text']"
    #copyTemplateWindowPublishBtnCss = "h3:contains('Copy Template') + div input[type='checkbox']"
    #copyTemplateWindowCreateCopyBtnCss = "h3:contains('Copy Template') + div + menu button:contains('Create Copy')"
    #copyTemplateBtnCss = "div[role='tooltip'] div[class*='ComplexTooltip'] a[data-auto-action*='copyTemplate']"
    #invoiceTemplateHeader = "h1[data-auto-label='invoiceTemplateTitle']";
    #addTemplateButton = "button[data-testid='add-template-button'] span";
    #showFilterButton = "button[data-auto-action='filters:toggle'] span";
    #searchBar = 'div[data-auto-input="searchField:templateName"]';
    #learnMore = 'a[data-auto-action="redirect:learnMore"]';
    #addTemplateBottom = "button[data-auto-action='redirect:createNewTemplateBottom']";
    #downLoadJson = "button[data-auto-action='downloadFile:templateJson']";
    #invoiceTemplateHeadermenu = "div[class*='TableContainer__TableWrapper'] tr th[data-auto-label*='DYNAMIC_LOCATOR_VALUE']";
    #selectTemplatebyName = "tbody tr[data-test-id='table row'] td:contains('DYNAMIC_LOCATOR_VALUE')";
    #templatewithlocale = "td:nth-child(3)";

    //Other variables
    #LANGUAGE_LABEL = "Language"
    #DEFAULT_ENGLISH_TEMPLATE = "Appdirect Template_EN_US"
    #DEFAULT_ENGLISH_LANGUAGE = "English (United States)"


    /**
     * Search for any template.
     *
     * @param templateName
     * Template name
     */
    searchTemplate(templateName) {
        cy.get(this.#searchTextBoxCss).clear().type(templateName)
        cy.get(this.#searchBtnTextBoxCss).click()
        cy.wait(2000)
    }

    /**
     * Click on 'Show Filter' button.
     */
    clickShowFilterBtn() {
        cy.get(this.#showFiltersBtnCss).click()
    }

    /**
     * Apply Filter.
     *
     * @param filterName
     * Filter name (e.g. Language etc)
     *
     * @param filterValue
     * Filter value
     */
    applyFilter(filterName, filterValue) {
        cy.get(this.#filterConditionCss.replace("DYNAMIC_LOCATOR_VARIABLE", filterName)).select(filterValue)
        cy.wait(2000)
    }

    /**
     * Reset search template search box.
     */
    resetSearchTemplate() {
        cy.get(this.#searchTextBoxCss).clear()
        cy.get(this.#searchBtnTextBoxCss).click()
        cy.wait(2000)
    }

    /**
     * Reset filter.
     *
     * @param filterName
     * Filter name
     */
    resetFilter(filterName) {
        cy.get(this.#filterConditionCss.replace("DYNAMIC_LOCATOR_VARIABLE", filterName)).select("Show All")
        cy.wait(2000)
    }

    /**
     * Click on 'Hide Filter' button.
     */
    clickHideFilterBtn() {
        cy.get(this.#hideFiltersBtnCss).click()
    }

    /**
     * Copy template by passing index of that row.
     *
     * @param index
     * Index number of the template to be copied from
     *
     * @param newTemplateName
     * New template name
     *
     * @param publishTemplateFlag
     * Publish new copied template flag
     */
    copyTemplate(index, newTemplateName, publishTemplateFlag) {
        cy.get(this.#invoiceTemplateOptionsBtnInTemplateListTableCss.replace("DYNAMIC_LOCATOR_VARIABLE", "5")).eq(index).click()
        cy.get(this.#copyTemplateBtnCss).eq(index).click()
        cy.get(this.#copyTemplateWindowNameTextBoxCss).clear().type(newTemplateName).then(() => {
            if (publishTemplateFlag) {
                cy.get(this.#copyTemplateWindowPublishBtnCss).click()
            }
        })

        cy.get(this.#copyTemplateWindowCreateCopyBtnCss).click()
    }

    /**
     * Copy template from default English template.
     *
     * @param newTemplateName
     * New template name
     *
     * @param publishTemplateFlag
     * Publish new copied template flag
     */
    copyTemplateFromDefaultEnglishTemplate(newTemplateName, publishTemplateFlag) {
        this.searchTemplate(this.#DEFAULT_ENGLISH_TEMPLATE)
        this.applyFilter(this.#LANGUAGE_LABEL, this.#DEFAULT_ENGLISH_LANGUAGE)

        cy.get(this.#invoiceTemplateListTableColumnsCss.replace("DYNAMIC_LOCATOR_VARIABLE", "1")).each(($templateName, index, $list) => {
            if ($templateName.text() === this.#DEFAULT_ENGLISH_TEMPLATE) {
                cy.get(this.#invoiceTemplateListTableColumnsCss.replace("DYNAMIC_LOCATOR_VARIABLE", "3")).eq(index).then(($getTemplateLocale) => {
                    const actualLocale = $getTemplateLocale.text()
                    if (actualLocale.includes(this.#DEFAULT_ENGLISH_LANGUAGE)) {
                        this.copyTemplate(index, newTemplateName, publishTemplateFlag)
                    }
                })
            }
        })
    }

    /**
     * This method will check whether a template already exists or not;
     * if not it'll create a copy of 'copyFromTemplate' template, if yes it'll print on console.
     *
     * @param templateName
     * Template name
     *
     * @param locale
     * Locale of the template
     *
     * @param copyFromTemplate
     * If template not exists, create a copy of template with this name
     *
     * @param createFromDefaultEnglishTemplate
     * If pass as true, it will create copy of default English template ignoring 'copyFromTemplate' parameter
     *
     * @param publishTemplateFlag
     * Publish new copied template flag
     */
    copyTemplateIfNotExists(templateName, locale, copyFromTemplate, createFromDefaultEnglishTemplate, publishTemplateFlag) {

        //Search template and apply filter
        this.searchTemplate(templateName)
        this.clickShowFilterBtn()
        this.applyFilter(this.#LANGUAGE_LABEL, locale)

        var isTemplatePresent = false

        cy.get(this.#invoiceTemplateListTableColumnsCss.replace("DYNAMIC_LOCATOR_VARIABLE", "1")).each(($templateName, index, $list) => {
            if ($templateName.text() === templateName) {
                cy.get(this.#invoiceTemplateListTableColumnsCss.replace("DYNAMIC_LOCATOR_VARIABLE", "3")).eq(index).then(($getTemplateLocale) => {
                    const actualLocale = $getTemplateLocale.text()
                    if (actualLocale.includes(locale)) {
                        isTemplatePresent = true;
                        console.log("Template: " + templateName + " already exists.")
                        this.resetSearchTemplate()
                        this.resetFilter(this.#LANGUAGE_LABEL)
                        this.clickHideFilterBtn()
                    }
                })
            }
        }).then(() => {
            if (!isTemplatePresent) {
                if (createFromDefaultEnglishTemplate) {
                    this.copyTemplateFromDefaultEnglishTemplate(templateName, publishTemplateFlag)
                    this.clickHideFilterBtn()
                } else {
                    this.searchTemplate(copyFromTemplate)
                    // this.clickShowFilterBtn()
                    this.applyFilter(this.#LANGUAGE_LABEL, locale)

                    cy.get(this.#invoiceTemplateListTableColumnsCss.replace("DYNAMIC_LOCATOR_VARIABLE", "1")).each(($templateName, index, $list) => {
                        if ($templateName.text() === copyFromTemplate) {
                            this.copyTemplate(index, templateName, publishTemplateFlag)
                            this.clickHideFilterBtn()
                        }
                    })
                }
            }
        })
    }

    /**
     * Click on template's row on Template List screen and navigate to template details page.
     *
     * @param templateName
     * Template name
     *
     * @param locale
     * Locale of the template
     *
     */
    openTemplateDetailsPage(templateName, locale) {
        //Search template and apply filter
        this.searchTemplate(templateName)
        this.clickShowFilterBtn()
        this.applyFilter(this.#LANGUAGE_LABEL, locale)

        var isTemplatePresent = false

        cy.get(this.#invoiceTemplateListTableColumnsCss.replace("DYNAMIC_LOCATOR_VARIABLE", "1")).each(($templateName, index, $list) => {
            if ($templateName.text() === templateName) {
                cy.get(this.#invoiceTemplateListTableColumnsCss.replace("DYNAMIC_LOCATOR_VARIABLE", "3")).eq(index).then(($getTemplateLocale) => {
                    const actualLocale = $getTemplateLocale.text()
                    if (actualLocale.includes(locale)) {
                        isTemplatePresent = true;
                        cy.get(this.#invoiceTemplateListTableColumnsCss.replace("DYNAMIC_LOCATOR_VARIABLE", "3")).eq(index).click()
                        cy.wait(2000)
                    }
                })
            }
        }).then(() => {
            if (!isTemplatePresent) {
                throw new Error("Template name: " + templateName + " does not exists. ")
            }
        })
    }


    /*
    * This function will verify all details on invoice template page.
    * */
    verifyInvoiceTemplatePage() {
        cy.get(this.#invoiceTemplateHeader).should("contain.text", "Invoice Templates");
        cy.get(this.#addTemplateButton).should("contain.text", "Add Template");
        cy.get(this.#showFilterButton).should("contains.text", "Show Filters");
        cy.get(this.#searchBar).should("be.visible");
        cy.get(this.#learnMore).should("contains.text", "Learn More");
        cy.get(this.#addTemplateBottom).should("be.visible");
        cy.get(this.#downLoadJson).should("be.visible");
        cy.get(this.#invoiceTemplateHeadermenu.replace("DYNAMIC_LOCATOR_VALUE", "name")).should("be.visible");
    }
    /*
     * This function will select a template on invoice template screen with a specific locale.
     *
     * @param templateName
     * templateName is name of template which we select.
     *
     * @param locale
     * locale is specific locale for that template.
     * */
    selectTemplate(templateName, locale) {
        cy.get(this.#selectTemplatebyName.replace("DYNAMIC_LOCATOR_VALUE", templateName)).parent('tr').find(this.#templatewithlocale).contains(locale).click({force:true});
    }
}

export const invoiceTemplatesListPO = new InvoiceTemplatesListPO()