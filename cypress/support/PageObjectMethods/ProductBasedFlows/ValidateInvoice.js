/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */
class ValidateInvoice {
    #pageRootCss = "div[id='page-container']"
    #dynamicElementCss = "div:contains('DYNAMIC_LOCATOR_VALUE')"
    #dynamicElementXpath = "//div[contains(text(),'DYNAMIC_LOCATOR_VALUE')]"

    /**
     * Verify whether a text is present in the invoice.
     *
     * @param matchingTextForLocator
     * Text by which cypress should be able to find the matching result (e.g. Amount due)
     *
     * @param expectedText
     * Exact expected text (e.g. Amount Paid $0.00)
     */
    verifyTextPresentInConvertedInvoice(matchingTextForLocator, expectedText) {
        cy.get(this.#pageRootCss).then($body => {
            if ($body.find(this.#dynamicElementCss.replace('DYNAMIC_LOCATOR_VALUE', matchingTextForLocator)).length > 0) {
                cy.get(this.#pageRootCss).xpath(this.#dynamicElementXpath.replace('DYNAMIC_LOCATOR_VALUE', matchingTextForLocator),
                    {timeout: 1000}).should('contain', expectedText)
            } else {
                throw new Error("Element is not visible")
            }
        });
    }
}

//Export statement
export const validateInvoice = new ValidateInvoice()