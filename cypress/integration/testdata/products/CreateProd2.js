import {productsCreate} from "../../../support/PageObjectMethods/BillingAndDistribution/Products/ProductsCreatePO";
import {loginPage} from "../../pages/generic/loginPage";
import {productsEdit} from "../../../support/PageObjectMethods/BillingAndDistribution/Products/ProductsEditPO";

const productData = require("./dataProducts.json");
describe("TEST DATA PREPARATION by UI : Products", () => {
    productData.forEach((productDataRow) => {
        const data = {
            name: productDataRow.name,
            edcode: productDataRow.edcode
        };
        context(`Product Setup : ${data.name}`, () => {

            it("Login Product", () => {
                const landingUrl = `https://marketplace.appsmart.com/en-US/home`
                //loginPage.open();
                //loginPage.login(Cypress.env("username"), Cypress.env("password"));
                //open create product page
                cy.asLogin()
                cy.wait(5000)
                cy.url()
                    .should('eq', landingUrl);
                productsCreate.open();

                cy.get('#appNameField').click({force:true}).type(data.name)
                // cy.get(productsCreate.productName).type(data.name)
                cy.get(productsCreate.standalone).click({force:true})
                //wait for xhr
                cy.wait(2000)
                cy.get(productsCreate.fullIntegration).click({force:true})
                cy.wait(2000)
                cy.get(productsCreate.singleUser).click({force:true})
                cy.wait(2000)
                cy.get(productsCreate.recurring).click({force:true})
                cy.wait(2000)
                cy.get(productsCreate.termsAndConditions).click({force:true})
                cy.wait(2000)
                cy.get(productsCreate.createProductBtn).click({force:true})
                //Set EditionCode
                productsEdit._waitForPageLoad()
                productsEdit._clickRecurringEdition()
                productsEdit._setEditionCode(data.edcode)
                productsEdit._clickSavePlan()
                productsEdit._verifySaveMsg()
                loginPage.logout()

            });
        });
    });
});
