describe('App', () => {
  it('should create a new user and assign a style', () => {
    const userID = Date.now()
    cy.visit('http://localhost:3000/user/signup')
    cy.get('input[type="text"]')
      .type('test name')
      .get('input[type="email"]')
      .type(`${userID}@crate.com`)
      .should('have.value', `${userID}@crate.com`)
      .get('input[type="password"]')
      .type('123456')
      .should('have.value', '123456')
    
    cy.get('.jsx-2258186958').click()
    cy.url().should('include', '/user/login')
    
    cy.get('input[type="email"]')
      .type(`${userID}@crate.com`)
      .should('have.value', `${userID}@crate.com`)
      .get('input[type="password"]')
      .type('123456')
      .should('have.value', '123456')
      cy.get('.jsx-2258186958').click()

    cy.get(':nth-child(1) > .jsx-511674265 > div > [style="text-align: center; margin-top: 1.5em; margin-bottom: 1em;"] > .jsx-1228826222').click()
    cy.url().should('include', '/user/style-preferences')

    cy.get(':nth-child(1) > input').check()
    .should('be.checked')
    cy.get('.jsx-1228826222').click()

    cy.get(':nth-child(1) > input').check()
    .should('be.checked')
    cy.get(':nth-child(3) > .jsx-1228826222').click()

    cy.get(':nth-child(1) > input').check()
    .should('be.checked')
    cy.get(':nth-child(3) > .jsx-1228826222').click()

    cy.get(':nth-child(1) > input').check()
    .should('be.checked')
    cy.get(':nth-child(3) > .jsx-1228826222').click()

    cy.get(':nth-child(2) > input').check()
    .should('be.checked')
    cy.get(':nth-child(3) > .jsx-1228826222').click()

    cy.get(':nth-child(3) > input').check()
    .should('be.checked')
    cy.get(':nth-child(3) > .jsx-1228826222').click()

    cy.url().should('include', '/user/subscriptions')

    cy.get('[href="/user/profile"]').click()

    cy.get('.jsx-230203545 > :nth-child(3)')
    .should('contain', 'My style: Preppy')
  })
})