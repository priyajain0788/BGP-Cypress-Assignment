import 'cypress-file-upload';

Cypress.Commands.add('login', (nric, name, uen, role) =>{
    cy.get('input[name="CPUID"]').type(nric)
    cy.get('input[name="CPUID_FullName"]').clear()
    cy.get('input[name="CPUID_FullName"]').type(name)
    cy.get('input[name="CPEntID"]').clear()
    cy.get('input[name="CPEntID"]').type(uen)
    cy.get('select[name="CPRole"]').select(role)
    cy.get('button[type="submit"]').last().click()
})

Cypress.Commands.add('newGrantApplication',() =>{
    cy.log('inside newApplication function')
    cy.get('a#dashboard-menubox-app-apply-grant').click({force: true})
    cy.get('input#IT').click()
    cy.get('input[id="International Expansion"]').click()
    cy.get('input[id="Market Readiness Assistance 2"]').click()
    cy.get('button[id="go-to-grant"]').click()
})

Cypress.Commands.add('applicationForm', () =>{
    cy.get('button[id="keyPage-form-button"]').click()
})

Cypress.Commands.add('eligibilityForm', () =>{
    cy.get('#react-eligibility-sg_registered_check-true').check()
    cy.get('input[id="react-eligibility-turnover_check-true"]').check()
    cy.get('input[id="react-eligibility-global_hq_check-true"]').check()
    cy.get('input[id="react-eligibility-new_target_market_check-true"]').check()
    cy.get('input[id="react-eligibility-started_project_check-true"]').check()
    cy.get('button[id="next-btn"]').click()
})

Cypress.Commands.add('contactDetailsForm', (name, designation, phone, email) =>{
    cy.get('input[id="react-contact_info-name"]').type(name)
    cy.get('input[id="react-contact_info-designation"]').type(designation)
    cy.get('input[id="react-contact_info-phone"]').type(phone)
    cy.get('input[id="react-contact_info-primary_email"]').type(email)
    cy.get('input[id="react-contact_info-correspondence_address-copied"]').check()
    cy.get('input[id="react-contact_info-copied"]').check()
    cy.get('button[id="next-btn"]').click()
})

Cypress.Commands.add('proposalForm', (projectTitle, projectDesc, activity, targetMarket) =>{
    cy.get('input[id="react-project-title"]').type(projectTitle)
        .then(($title) => { 
            const projectTitle = $title.text()
            cy.log(projectTitle)
            })
    
    cy.get('input[id="react-project-start_date"]').click()
    cy.get('td.rdtDay.rdtToday').first().click()
    cy.get('input[id="react-project-end_date"]').click()
    cy.get('td.rdtDay.rdtToday').last().click()
    cy.get('textarea[id="react-project-description"]').type(projectDesc)
    cy.get('span[id="react-select-project-activity--value"]').click()
    cy.get('input[role="combobox"]').first().type(activity)
    cy.get('input[role="combobox"]').first().type('{enter}')
    cy.get('span[id="react-select-project-primary_market--value"]').click()
    cy.get('input[role="combobox"]').last().type(targetMarket)
    cy.get('input[role="combobox"]').last().type('{enter}')
    cy.get('span[class="bgp-label"]').first().click()
    cy.get('button[id="next-btn"]').click()
})

Cypress.Commands.add('businessImpactForm', (os0, os1, os2, os3, oi0, oi1, oi2, oi3, rational_remark, benefits_remarks) =>{
    cy.get('input[id="react-project_impact-fy_end_date_0"]').click()
    cy.get('td.rdtDay.rdtToday').first().click()
    cy.get('input[id="react-project_impact-overseas_sales_0"]').type(os0)
    cy.get('input[id="react-project_impact-overseas_sales_1"]').type(os1)
    cy.get('input[id="react-project_impact-overseas_sales_2"]').type(os2)
    cy.get('input[id="react-project_impact-overseas_sales_3"]').type(os3)
    cy.get('input[id="react-project_impact-overseas_investments_0"]').type(oi0)
    cy.get('input[id="react-project_impact-overseas_investments_1"]').type(oi1)
    cy.get('input[id="react-project_impact-overseas_investments_2"]').type(oi2)
    cy.get('input[id="react-project_impact-overseas_investments_3"]').type(oi3)
    cy.get('textarea[id="react-project_impact-rationale_remarks"]').type(rational_remark)
    cy.get('textarea[id="react-project_impact-benefits_remarks"]').type(benefits_remarks)
    cy.get('button[id="next-btn"]').click()
})

Cypress.Commands.add('costForm', (vendor_name, filePath, amount_in_billing_currency) =>{
    cy.wait(2000)
    cy.get('div[id="react-project_cost-vendors-accordion-header"]').click()
    cy.get('button[id="react-project_cost-vendors-add-item"]').click()
    cy.get('input[id="react-project_cost-vendors-0-local_vendor-false"]').click()
    cy.get('input[id="react-project_cost-vendors-0-vendor_name"]').type(vendor_name)
    cy.get('input[id="react-project_cost-vendors-0-attachments-input"]').attachFile(filePath);
    cy.get('input[id="react-project_cost-vendors-0-amount_in_billing_currency"]').type(amount_in_billing_currency)
    cy.get('button[id="next-btn"]').click()
})

Cypress.Commands.add('declareForm', () =>{
    cy.wait(2000)
    cy.get('input[id="react-declaration-criminal_liability_check-false"]').check()
    cy.get('input[id="react-declaration-civil_proceeding_check-false"]').check()
    cy.get('input[id="react-declaration-insolvency_proceeding_check-false"]').check()
    cy.get('input[id="react-declaration-project_incentives_check-false"]').check()
    cy.get('input[id="react-declaration-other_incentives_check-false"]').check()
    cy.get('input[id="react-declaration-project_commence_check-false"]').check()
    cy.get('input[id="react-declaration-related_party_check-false"]').check()
    cy.get('input[id="react-declaration-covid_safe_check-true"]').check()
    cy.get('input[id="react-declaration-covid_safe_ques_check-true"]').check()
    cy.get('input[id="react-declaration-consent_acknowledgement_check"]').check()
    cy.get('button[id="review-btn"]').click()  
})



