describe('story3', () => {

    beforeEach(() => {
        cy.log('inside before')
        cy.visit('https://public:Let$BeC001@bgp-qa.gds-gov.tech')
        cy.get('div#login-button').click()
        cy.login('S1234567A', 'Tan Ah Kow', 'BGPQEDEMO', 'Acceptor')
        cy.newGrantApplication()
        cy.applicationForm()
        cy.eligibilityForm()
    })

    it('Verify SubSection Of MainContactPerson', () => {
        cy.get('input#react-contact_info-name').should('be.visible')
        cy.get('input#react-contact_info-designation').should('be.visible')
        cy.get('input#react-contact_info-phone').should('be.visible')
        cy.get('input#react-contact_info-primary_email').should('be.visible')
        cy.get('input#react-contact_info-correspondence_address-copied').should('be.visible')
    })

    it('Verify CheckBoxSameAsAddress', () => {
        cy.get('input#react-contact_info-correspondence_address-block').invoke('text')
            .then((text => {
                expect(text.trim()).to.eq('')
            }));
        cy.get('input#react-contact_info-correspondence_address-street').invoke('text')
            .then((text => {
                expect(text.trim()).to.eq('')
            }));
        cy.get('#react-contact_info-correspondence_address-level').invoke('text')
            .then((text => {
                expect(text.trim()).to.eq('')
            }));
        cy.get('#react-contact_info-correspondence_address-unit').invoke('text')
            .then((text => {
                expect(text.trim()).to.eq('')
            }));
        cy.get('input#react-contact_info-correspondence_address-copied').click()
        expect('input#react-contact_info-correspondence_address-block').not.to.be.empty
        expect('input#react-contact_info-correspondence_address-street').not.to.be.empty
        expect('input#react-contact_info-correspondence_address-level').not.to.be.empty
        expect('input#react-contact_info-correspondence_address-unit').not.to.be.empty

    })

    it('Verify CheckBoxSameAsMainContactPerson', () => {
        cy.get('input[id="react-contact_info-name"]').type('Name')
        cy.get('input[id="react-contact_info-designation"]').type('analyst')
        cy.get('input[id="react-contact_info-primary_email"]').type('abc@gmail.com')
        cy.screenshot()

        cy.get('input#react-contact_info-offeree_name').should('be.visible')
        cy.get('input#react-contact_info-offeree_designation').should('be.visible')
        cy.get('input#react-contact_info-offeree_email').should('be.visible')

        cy.get('input#react-contact_info-copied').click()
        cy.get('input#react-contact_info-offeree_name').should('have.prop', 'value').and('equal', 'Name')
        cy.get('input#react-contact_info-offeree_designation').should('have.prop', 'value').and('equal', 'analyst')
        cy.get('input#react-contact_info-offeree_email').should('have.prop', 'value').and('equal', 'abc@gmail.com')
        cy.screenshot()
    })

    it('Verify Saved values on Save&Refresh of ContactDetailsPage', () => {
        cy.get('input[id="react-contact_info-name"]').type('Name')
        cy.get('input[id="react-contact_info-designation"]').type('analyst')
        cy.get('input[id="react-contact_info-phone"]').type('98765432')
        cy.get('input[id="react-contact_info-primary_email"]').type('abc@gmail.com')
        cy.get('input[id="react-contact_info-correspondence_address-copied"]').check()
        cy.get('input[id="react-contact_info-copied"]').check()
        cy.get('#save-btn').click()
        cy.screenshot()
        cy.reload()
        cy.screenshot()
        cy.get('input[id="react-contact_info-name"]').should('have.prop', 'value').and('equal', 'Name')
        cy.get('input[id="react-contact_info-designation"]').should('have.prop', 'value').and('equal', 'analyst')
        cy.get('input[id="react-contact_info-phone"]').should('have.prop', 'value').and('equal', '98765432')
        cy.get('input[id="react-contact_info-primary_email"]').should('have.prop', 'value').and('equal', 'abc@gmail.com')
        cy.get('input[id="react-contact_info-correspondence_address-copied"]').should('have.prop', 'value').and('equal', 'on')
        cy.get('input[id="react-contact_info-copied"]').should('have.prop', 'value').and('equal', 'on')
        cy.get('input#react-contact_info-offeree_name').should('have.prop', 'value').and('equal', 'Name')
        cy.get('input#react-contact_info-offeree_designation').should('have.prop', 'value').and('equal', 'analyst')
        cy.get('input#react-contact_info-offeree_email').should('have.prop', 'value').and('equal', 'abc@gmail.com')
    })
})
