import {loginPage} from "../../pages/generic/loginPage";
import {featureFlagsPage} from "../../pages/superuser/settings/featureFlags";

beforeEach("prerequisite", () =>{
    cy.fixture("envInfo.json").as("env");
    cy.get("@env").then((env) => {
        loginPage.open();
        loginPage.login(env.Orchard.Superuser.Username, env.Orchard.Superuser.Password);
    })
})

    /*
    Owner: Jai
    Title: Enable ITG service on Orchard box
    Test Description: Enable below flags on screen '/superuser/marketplaces#feature-flags'
        - 'Account Invoice v2'
        - 'Invoice Builder (Marketplace)'
    */
it("Setup: Enable Invoice Templates", () =>{
    featureFlagsPage.open();
    featureFlagsPage.toggleFlag("Account Invoice v2", "Enable");
    cy.wait(2000);
    featureFlagsPage.toggleFlag("Invoice Builder (Marketplace)", "Enable");
    featureFlagsPage.saveBillingSettings();
})