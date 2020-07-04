describe('story3', () => {

    beforeEach(() => {
        cy.log('inside before')
        cy.visit('https://public:Let$BeC001@bgp-qa.gds-gov.tech')
        cy.get('div#login-button').click()
        cy.login('S1234567A', 'Tan Ah Kow', 'BGPQEDEMO', 'Acceptor')
        cy.newGrantApplication()
        cy.applicationForm()
        cy.eligibilityForm()
        cy.contactDetailsForm('Name', 'Analyst', '98765432', 'abc@gmail.com')
        cy.proposalForm('Analyst', 'Project Description', 'FTA Consultancy', 'Singapore')
        cy.businessImpactForm('2500.00', '2500.00', '2500.00', '2500.00', '2500.00', '2500.00', '2500.00', '2500.00', 'Rationale for Projection', 'Non Tangible Benefits')
        const filePath = 'ACE_QE_Tech_Challenge_Jun2019.pdf';
        cy.costForm('CST TESTING PTE LTD', filePath, '25')
        cy.declareForm()
    })

    it('verify review form', () => {

        //Eligibility form varification
        cy.get('div#eligibility h2').should('be.visible').and('contain.text', 'Eligibility')
        cy.get('#react-eligibility-sg_registered_check').should('be.visible').and('contain.text', 'Yes')
        cy.get('#react-eligibility-turnover_check').should('be.visible').and('contain.text', 'Yes')
        cy.get('#react-eligibility-turnover_check').should('be.visible').and('contain.text', 'Yes')
        cy.get('#react-eligibility-new_target_market_check').should('be.visible').and('contain.text', 'Yes')
        cy.get('#react-eligibility-started_project_check').should('be.visible').and('contain.text', 'Yes')
        cy.screenshot()

        //Contact Details Form Verification
        cy.get('div#contact_info h2').should('be.visible').and('contain.text', 'Contact Detail')
        cy.get('div#react-contact_info-name').should('be.visible').and('contain.text', 'Name')
        cy.get('div#react-contact_info-designation').should('be.visible').and('contain.text', 'Analyst')
        cy.get('div#react-contact_info-designation')
            .then(title => {
                const projectTitle = title.text()
                cy.log(projectTitle)
                cy.wrap(projectTitle).as('projectTitle')
            })
        cy.get('div#react-contact_info-phone').should('be.visible').and('contain.text', '98765432')
        cy.get('div#react-contact_info-primary_email').should('be.visible').and('contain.text', 'abc@gmail.com')
        cy.screenshot()

        //Proposal Form Verification
        cy.get('div#project h2').should('be.visible').and('contain.text', 'Proposal')
        cy.get('div#react-project-title').should('be.visible').and('contain.text', 'Analyst')
        const todaysDate = Cypress.moment().format('DD MMM yyyy')
        cy.get('div#react-project-start_date').should('be.visible').and('contain.text', todaysDate)
        cy.get('div#react-project-end_date').should('be.visible').and('contain.text', todaysDate)
        cy.get('div#react-project-activity').should('be.visible').and('contain.text', 'FTA Consultancy')
        cy.get('div#react-project-primary_market').should('be.visible').and('contain.text', 'Singapore')
        cy.screenshot()

        //Business Impact form Verification
        cy.get('div#project_impact h2').should('be.visible').and('contain.text', 'Business Impact')
        cy.get('div#react-project_impact-fy_end_date_0').should('be.visible').and('contain.text', todaysDate)
        cy.get('div#react-project_impact-overseas_sales_0').should('be.visible').and('contain.text', '2,500.00')
        cy.get('div#react-project_impact-overseas_investments_0').should('be.visible').and('contain.text', '2,500.00')
        cy.get('div#react-project_impact-rationale_remarks').should('be.visible').and('contain.text', 'Rationale for Projection')
        cy.get('div#react-project_impact-benefits_remarks').should('be.visible').and('contain.text', 'Non Tangible Benefits')
        cy.screenshot()

        //Cost Form Verification
        cy.get('div#project_cost h2').should('be.visible').and('contain.text', 'Cost')
        cy.get('div#react-project_cost-vendors-0-local_vendor').should('be.visible').and('contain.text', 'Overseas')
        cy.get('div#react-project_cost-vendors-0-vendor_name').should('be.visible').and('contain.text', 'CST TESTING PTE LTD')
        cy.get('div#react-project_cost-vendors-0-amount_in_billing_currency').should('be.visible').and('contain.text', 'SGD 25.00')
        cy.get('div#react-project_cost-vendors-0-estimated_cost').should('be.visible').and('contain.text', 'SGD 25.00')
        cy.screenshot()

        //Declare Form Verification
        cy.get('div#declaration h2').should('be.visible').and('contain.text', 'Declare & Review')
        cy.get('#react-declaration-criminal_liability_check').should('be.visible').and('contain.text', 'No')
        cy.get('#react-declaration-civil_proceeding_check').should('be.visible').and('contain.text', 'No')
        cy.get('#react-declaration-insolvency_proceeding_check').should('be.visible').and('contain.text', 'No')
        cy.get('#react-declaration-project_incentives_check').should('be.visible').and('contain.text', 'No')
        cy.get('#react-declaration-other_incentives_check').should('be.visible').and('contain.text', 'No')
        cy.get('#react-declaration-project_commence_check').should('be.visible').and('contain.text', 'No')
        cy.get('#react-declaration-related_party_check').should('be.visible').and('contain.text', 'No')
        cy.get('#react-declaration-covid_safe_check').should('be.visible').and('contain.text', 'Yes')
        cy.get('#react-declaration-covid_safe_ques_check').should('be.visible').and('contain.text', 'Yes')
        cy.screenshot()

        cy.wait(3000)
        cy.get('#react-declaration-info_truthfulness_check').check()
        cy.get('button#submit-btn').click()

        cy.get('section.card h3').should('be.visible').and('contain.text', 'Your application has been submitted.')
        cy.get('section.card div:nth-child(2) div:nth-child(2) table[class="key-status-section"]>tbody>tr:nth-child(1)>td:nth-child(1)').should('be.visible').and('contain.text', 'Ref ID:')
        cy.get('section.card div:nth-child(2) div:nth-child(2) table[class="key-status-section"]>tbody>tr:nth-child(1)>td:nth-child(2)')
            .then(id => {
                const refId = id.text()
                cy.log(refId)
                cy.wrap(refId).as('refId')
            })

        cy.get('section.card div:nth-child(2) div:nth-child(2) table[class="key-status-section"]>tbody>tr:nth-child(2)>td:nth-child(1)').should('be.visible').and('contain.text', 'Status:')
        cy.get('section.card div:nth-child(2) div:nth-child(2) table[class="key-status-section"]>tbody>tr:nth-child(2)>td:nth-child(2)')
            .then(($status) => {
                const reqStatus = $status.text()
                cy.log(reqStatus)
            })
        cy.get('section.card div:nth-child(2) div:nth-child(2) table[class="key-status-section"]>tbody>tr:nth-child(3)>td:nth-child(1)').should('be.visible').and('contain.text', 'Submitted on:')
        cy.get('section.card div:nth-child(2) div:nth-child(3) table[class="key-status-section"]>tbody>tr:nth-child(1)>td:nth-child(1)').should('be.visible').and('contain.text', 'Agency Details:')
        cy.get('section.card div:nth-child(2) div:nth-child(3) table[class="key-status-section"]>tbody>tr:nth-child(1)>td:nth-child(2)')
            .then(($agencyDetails) => {
                const reqAgencyDetails = $agencyDetails.text()
                cy.log(reqAgencyDetails)
            })

        cy.screenshot()

        cy.get('#sgds-nav-start[href="/dashboard"]').click()
        cy.wait(6000)
        cy.get('a[href="#processing"]').click()

        cy.screenshot()
        cy.get('@refId').then(refId => {
            cy.get('table#db-apps-processing tbody.tab-content tr:nth-child(1) td:nth-child(1)')
                .then(processingTabId => {
                    const processingRefId = processingTabId.text()
                    cy.log(processingRefId)
                    expect(refId).to.eq(processingRefId)
                })
        })

        cy.get('@projectTitle').then(projectTitle => {
            cy.get('table#db-apps-processing tbody.tab-content tr:nth-child(1) td:nth-child(4) div.title-div')
                .then(processingTabProjectTitle => {
                    const processingProjectTitle = processingTabProjectTitle.text()
                    cy.log(processingProjectTitle)
                    expect(processingProjectTitle).to.eq(projectTitle)
                })
        })
    })

})

