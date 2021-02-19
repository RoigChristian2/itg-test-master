/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */

export class SearchAndPurchaseProduct {

    #productDetailsCss = "div[class*='js-assigned-apps'] div[class*='adb-tile adb-myapp'] p[class*='myapp--content']"
    #productNameCss = "span:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #productOptionBtnCss = "menu[class*='myapp--menu'] a[class*='button__secret'] > i"
    #manageAppOptionLinkCss = "menu[class*='myapp--menu'] a[class*='button__secret']+div[class*='dropdown-container'] a:contains('Manage App')"
    #searchProductTextboxCss = "div[data-adb-component*='appdirectUniversalSearch'] input[data-auto-input*='search:input']"
    #searchProductBtnCss = "div[data-adb-component*='appdirectUniversalSearch'] button[data-auto-action*='search:button']"
    // #productListV1Css = "section[class*='container-box'] div[class*='listing-items-row']"
    // #productListV2Css = "section[class*='container'] > div[class*='grid-container'] > div"
    #productRowCss = "section[class*='container'] > div[class*='grid-container'] > div div[data-component='ListingRow']"
    #productNameOnAllApplicationCss = "a:contains('DYNAMIC_LOCATOR_VARIABLE')"
    // #buyNowBtnV1Css = "div[class*='profile_header'] div[class*='profile-actions'] > a:contains('Buy Now')"
    // #buyNowBtnV2Css = "div[class*='profile_header'] div[class*='header-actions'] button"
    #buyNowCommonCss="div[class*='header--content'] div[class*='action'] span:contains('Buy Now')"
    #priceWrapperOnCreateOrderPageCss = "div[class*='select-purchase'] > div[role*='radiogroup'] span[class*='priceWrapper']"
    #priceWrapperNameCss = "label:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #additionalUsersTextboxCss = "div[class*='editionRow selected'] div[class*='subPriceRow'] > div[class='priceLineItem']>input"
    #createOrderContinueBtnCss = "div[class*='styled buttons'] button[ga*='CreateOrderFormButton']"
    #orderCustomAttributeCss = "h1+form div[class*='custom-attribute-group'] span:contains('DYNAMIC_LOCATOR_VARIABLE')"
    #additionalInformationContinueBtnCss = "div[class*='styled buttons'] button[class*='buttonResponse']"
    #billingDetailContinueBtnCss = "button[ga='appPaymentBillingDetailsContinueButton']"
    #confirmOrderAgreeBtnsCss = "div[class*='agreeLinks']"
    #iAgreeCheckboxCss = "div[class*='agreeLinks'] > input[class*='agreeToTermsCheckbox']"
    #placeOrderbtnCss = "div[class*='confirmAgreeButtons'] button[id='placeOrder']"
    #orderReceiptPurchaseContentCss = "div[class='purchase-content']"
    #orderReceiptSuccessMsgCss = "div > p:contains('You successfully subscribed to')"
    #downloadInvoiceBtnCss = "div[class*='page--content'] span:contains('Download')"
    #cancelProductSubscriptionBtnCss = "div[class*='manage-app-header'] a[ga*='manageAppCancelButton']"
    #yesBtnOnCancelSubscriptionWindowCss = "div[aria-labelledby*='Cancel Subscription'] button[class*='buttonResponse'] > span:contains('Yes')"
    #orderIDValue = "div[data-auto='orderID'] > span"
    #confirmOrderCss = "div[class='purchase-content']"

    //Other variables
    #findInvoiceIDFromOrderIDDBQuery = "SELECT * FROM invoice_2_order where PURCHASE_ORDER_ID=DYNAMIC_LOCATOR_VARIABLE"
    #downloadPdfURI = "/invoices/DYNAMIC_LOCATOR_VARIABLE"
    #getInvoiceIDFromOrderIdURL = "/api/billing/v1/orders/DYNAMIC_LOCATOR_VARIABLE/invoices"
    #convertedPDFDirectory = "cypress/ConvertedPDF/"

    /**
     * This method will look for the product's active subscription for the user,
     * if found yes it will cancel the previous subscription and search for the
     * same product again else it will directly search the product and opens up
     * product profile.
     *
     * @param productName
     * Product name
     */
    searchProductAndSelectProduct(productName) {
        cy.visit('/myapps')
        cy.get(this.#productDetailsCss).then($body => {
            if ($body.find(this.#productNameCss.replace('DYNAMIC_LOCATOR_VARIABLE', productName)).length > 0) {
                this.cancelSubscriptionOfProduct(productName)
                console.log("Product: " + productName + " already has active subscription, cancelling the previous subscription.")
                cy.wait(10000)
            }
            cy.get(this.#searchProductTextboxCss).type(productName, {force: true})
            cy.get(this.#searchProductBtnCss).click()
            cy.wait(10000)
            this.selectProduct(productName)

        });
    }

    /**
     * Cancel active subscription of the product.
     *
     * @param productName
     * Product name
     */
    cancelSubscriptionOfProduct(productName) {
        cy.get(this.#productDetailsCss).then($body => {
            if ($body.find(this.#productNameCss.replace('DYNAMIC_LOCATOR_VARIABLE', productName)).length > 0) {

                cy.get(this.#productDetailsCss + " " + this.#productNameCss.replace('DYNAMIC_LOCATOR_VARIABLE', productName)).parent().parent().parent().trigger('mouseover')
                cy.get(this.#productDetailsCss + " " + this.#productNameCss.replace('DYNAMIC_LOCATOR_VARIABLE', productName)).parent().parent().parent()
                    .find(this.#productOptionBtnCss).click()
                cy.get(this.#productDetailsCss + " " + this.#productNameCss.replace('DYNAMIC_LOCATOR_VARIABLE', productName)).parent().parent().parent()
                    .find(this.#manageAppOptionLinkCss).click()
                cy.get(this.#cancelProductSubscriptionBtnCss).click()
                cy.get(this.#yesBtnOnCancelSubscriptionWindowCss).click()

            } else {
                throw new Error("Product: " + productName + "not found on home page.")
            }
        });
    }

    /**
     * Select product in search results.
     *
     * @param productName
     * Product name
     */
    selectProduct(productName) {
        // cy.get(this.#productListV2Css).then($body => {
        cy.get(this.#productRowCss).parent().then($body => {
            if ($body.find(this.#productNameOnAllApplicationCss.replace('DYNAMIC_LOCATOR_VARIABLE', productName)).length > 0) {
                cy.wrap($body.find(this.#productNameOnAllApplicationCss.replace('DYNAMIC_LOCATOR_VARIABLE', productName))).click()
            } else {
                throw new Error("Product: " + productName + " is not present in All Applications first page")
            }
        });
    }

    /**
     * Click 'Buy Now' button on 'App Overview' page and select 'Edition' & 'Total Users' from Create Order screen.
     *
     * @param editionName
     * Full edition name (e.g. Recurring Edition)
     *
     * @param additionalUsersCount
     * Count of users
     */
    clickBuyNowOnAppOverviewAndUpdateEditionOfProduct(editionName, additionalUsersCount) {
        // cy.get(this.#buyNowBtnV2Css).click()
        cy.get(this.#buyNowCommonCss).parent().click()

        if (editionName !== "" && additionalUsersCount !== "") {
            cy.get(this.#priceWrapperOnCreateOrderPageCss).then($body => {
                if ($body.find(this.#priceWrapperNameCss.replace('DYNAMIC_LOCATOR_VARIABLE', editionName)).length > 0) {
                    cy.wrap($body.find(this.#priceWrapperNameCss.replace('DYNAMIC_LOCATOR_VARIABLE', editionName))).as('editionNameWB')

                    cy.get('@editionNameWB').parent().find('input').check()
                    // .parent().find('input').check()
                    cy.wait(10000)
                    cy.get(this.#additionalUsersTextboxCss).clear().type(additionalUsersCount)
                } else {
                    throw new Error("Price wrapper: " + editionName + " is invalid")
                }
            });
        } else if (editionName === "" && additionalUsersCount !== "") {
            cy.get(this.#additionalUsersTextboxCss).clear().type(additionalUsersCount)
        }

        cy.get(this.#createOrderContinueBtnCss).click()
        cy.wait(5000)
    }

    /**
     * Add text type order custom attribute in Additional Information screen.
     *
     * @param customAttributeName
     * Custom Attribute label name
     *
     * @param customAttributeValue
     * Custom Attribute Value
     *
     */
    addTextTypeCustomAttributeOnAdditionalInformationPage(customAttributeName, customAttributeValue) {

        cy.get(this.#orderCustomAttributeCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeName)).parent().find("input").type(customAttributeValue)
    }

    /**
     * Add checkbox type order custom attribute in Additional Information screen.
     *
     * @param customAttributeName
     * Custom Attribute label name
     *
     * @param customAttributeCheckboxList
     * List of Custom Attribute Values to be checked
     *
     */
    addCheckboxTypeCustomAttributeOnAdditionalInformationPage(customAttributeName, customAttributeCheckboxList) {

        cy.get(this.#orderCustomAttributeCss.replace('DYNAMIC_LOCATOR_VARIABLE', customAttributeName)).parent().as("customAttributeLocation")

        for (var index = 0; index < customAttributeCheckboxList.length; index++) {
            var optionValue = customAttributeCheckboxList[index]
            cy.get('@customAttributeLocation').find("span:contains('" + optionValue + "')").prev().check()
        }
    }

    /**
     * Click 'Continue' button on Additional Information screen.
     */
    clickContinueOnAdditionalInformationTab() {
        cy.wait(1000)
        cy.get(this.#additionalInformationContinueBtnCss).click()
    }

    /**
     * Click 'Continue' button on Billing Details screen, assuming we have valid payment card already added.
     */
    clickContinueOnBillingDetailsTab() {
        cy.get(this.#billingDetailContinueBtnCss).click()
    }

    /**
     * Check 'I agree..' checkbox and click on 'Place Order' button on Confirm Order screen.
     */
    clickPlaceOrderOnConfirmOrderTab() {
        cy.get(this.#confirmOrderCss).then($body => {
            if ($body.find(this.#iAgreeCheckboxCss).length > 0) {
                cy.wrap($body.find(this.#iAgreeCheckboxCss)).check()

            } else {
                console.log("'I agree' checkbox is not present");
            }
        });
        cy.get(this.#placeOrderbtnCss).click()
        cy.wait(15000)
    }

    /**
     * Fetch the placed order url and find the orderID from it and from that orderID fetch invoiceID and download the same invoice, if required.
     *
     * @param downloadInvoiceFlag
     * Flag to download the invoice.
     */
    getInvoiceIdFromOrderReceiptPageAndDownloadInvoice(downloadInvoiceFlag) {
        cy.get(this.#orderReceiptPurchaseContentCss).then($body => {
            if ($body.find(this.#orderReceiptSuccessMsgCss).length > 0) {
                cy.get(this.#orderIDValue).invoke('text').then(orderID => {
                    cy.task("queryDb", this.#findInvoiceIDFromOrderIDDBQuery.replace('DYNAMIC_LOCATOR_VARIABLE', orderID)).then(result => {
                        let invoiceID = JSON.parse(JSON.stringify(result))[0]['invoice_id']
                        console.log("Invoice ID: " + invoiceID)
                        // return invoiceID
                        if (downloadInvoiceFlag) {
                            cy.visit(this.#downloadPdfURI.replace('DYNAMIC_LOCATOR_VARIABLE', invoiceID))
                            cy.get(this.#downloadInvoiceBtnCss).click()
                        } else {
                            console.log("'downloadInvoiceFlag' flag is false hence not downloading the invoice with Invoice ID: " + invoiceID)
                        }
                    })
                })
            } else {
                throw new Error("Failed to purchase the product")
            }
        });
    }

    /**
     * This method will perform below operations, sequentially-
     * 1. Fetch OrderID from order success page
     * 2. Query DB to get invoiceID from orderID
     * 3. Fetch invoiceNumber from orderID by triggering API
     * 4. Download the invoice
     * 5. Convert downloaded PDF into HTML and save at 'cypress/ConvertedPDF/'+'outputFileName' file path
     * **** Make sure to update GenericParameters.json > 'userDownloadFolder' to your current default download location ****
     *
     * @param outputFileName
     * Output file name with .html extension (e.g. Converted_File.html)
     */
    downloadInvoiceFromOrderIDAndConvertToHTMLFormat(outputFileName) {
        let clientKey, clientSecret
        cy.fixture("GenericParameters.json").as("genericParameters");
        cy.get("@genericParameters").then((genericParameters) => {
            clientKey = genericParameters.oAuth1.clientKey
            clientSecret = genericParameters.oAuth1.clientSecret
        });

        cy.get(this.#orderReceiptPurchaseContentCss).then($body => {
            if ($body.find(this.#orderReceiptSuccessMsgCss).length > 0) {
                cy.get(this.#orderIDValue).invoke('text').then(orderID => {
                        cy.task("queryDb", this.#findInvoiceIDFromOrderIDDBQuery.replace('DYNAMIC_LOCATOR_VARIABLE', orderID)).then(result => {

                            let invoiceID = JSON.parse(JSON.stringify(result))[0]['invoice_id']
                            console.log("Invoice ID: " + invoiceID)
                            console.log("Order: " + orderID)
                            let baseURL = Cypress.config().baseUrl
                            if (Cypress.config().baseUrl.endsWith('/')) {
                                baseURL = baseURL.substr(0, baseURL.lastIndexOf('/'))
                            }
                            cy.task('getResponseBodyFromOAuth1API',
                                {
                                    requestURL: baseURL + this.#getInvoiceIDFromOrderIdURL.replace('DYNAMIC_LOCATOR_VARIABLE', orderID),
                                    clientKey: clientKey,
                                    clientSecret: clientSecret
                                }).then((responseBody) => {
                                console.log("Response Body: " + responseBody)
                                var invoiceNumber = responseBody[0]['invoiceId']
                                console.log("Invoice #" + responseBody[0]['invoiceId'])
                                cy.visit(this.#downloadPdfURI.replace('DYNAMIC_LOCATOR_VARIABLE', invoiceID))
                                cy.get(this.#downloadInvoiceBtnCss).click().then(() => {
                                    cy.wait(10000).then(() => {
                                        //Convert the downloaded pdf into html and save in 'cypress/ConvertedPDF' directory
                                        cy.task('convertPdfToHtml', {
                                            inputPdfFilePath: "/Downloads/" + 'invoice_' + invoiceNumber + '.pdf',
                                            outputFileName: this.#convertedPDFDirectory + outputFileName
                                        })
                                    })
                                })
                            })
                        })
                    }
                )
            } else {
                throw new Error("Failed to purchase the product")
            }
        });
    }
}

// Export statement
export const searchAndPurchaseProduct = new SearchAndPurchaseProduct()
