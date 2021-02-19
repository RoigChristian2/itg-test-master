/// <reference types="Cypress" />

/**
 * @author: Ankit Maheshwari
 */
export class DashboardPO {

    //Locators
    #usersLinkCss="a[href*='users']";

    //Other variables
    #dashboardURL = "/channel/marketplace/dashboard"

    /**
     * Open Marketplace > Dashboard
     */
    navigateToDashboard()
    {
        cy.visit(this.#dashboardURL)
    }

    /**
     * Open 'User Details' screen.
     */
    openUserDetailsScreen() {
        cy.get(this.#usersLinkCss).click()
    }
}

export const dashboardPO = new DashboardPO()