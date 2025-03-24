class PlanSelectionSupplement{
planSelectionCheckBox='.mat-checkbox-layout > .mat-checkbox-inner-container'
  
SetplanSelectionCheckBox(index)
{
  cy.get(this.planSelectionCheckBox, { timeout: 10000 })
  .should('be.visible')
  .eq(index) .click({ force: true });


}

Max3PlanVerifyMsg()
{
  cy.on('window:confirm',(t)=>{
      expect(t).to.contains("Maximum 3 plans allowed.Remove previous plan to add new plan"); 
})
}

VerifyMsg()
{
  cy.on('window:confirm',(t)=>{
      expect(t).to.contains("Maximum 1 MA with/without 1 PDP or 1 PDP with 1 supplement plan are allowed");     //asretion ,user can selectonly 1 plan out of selected 3  maximum plans.
      
  })
}


SelectPlanN='.mat-option-text';
SetSelectPlanN()
{
  cy.get(this.SelectPlanN).contains("N").wait(2000).click({force:true});
}

FilterButton='.ng-fa-icon'
SetFilterButton()
{
    cy.get(this.FilterButton,{timeout:8000}).should('be.visible').click({force:true}) 
}

FilterByInsuranceCarrier(InsuranceCarrier)
{
    cy.get('.mat-select-placeholder').click()
    cy.get('div>.mat-select-panel-wrap')
    .find('div[role="listbox"]')
    .contains(InsuranceCarrier)
    .scrollIntoView({ timeout: 10000 })
    .should('be.visible')
    .click({ force: true })
        
}

ResetButton='.mat-action-row > .mat-focus-indicator';
SetResetButton()
{
    cy.get(this.ResetButton).click()
}

PlanDetailsButton='.mat-button-wrapper';
SetPlanDetailsButton()
{
    cy.get(this.PlanDetailsButton).contains('Plan Details').click();
}

Hospitalization='.mat-expansion-panel-body:nth-child(1)'
VerifyHospitalization()
{
    cy.get(this.Hospitalization).contains("Hospitalization");  //Hospitalization validation under partA
   cy.wait(2000)
}

PartAExpandsCollapsIndicator='#mat-expansion-panel-header-1 > .mat-expansion-indicator';
SetPartAExpandsCollapsIndicator()
{
    cy.get(this.PartAExpandsCollapsIndicator).click();
}

SetHospitalizationClick()
{
    cy.get('.mat-content .mat-expansion-panel-header-title').contains('Hospitalization').click({force:true});
}


SetPartBExpands()
{
    cy.get('.mat-content .mat-expansion-panel-header-title').contains('Part B').click(); //PartB expands
cy.wait(2000)
}
SetPartBCollapse()
{
    cy.get('#mat-expansion-panel-header-2 >span.mat-expansion-indicator').should('be.visible').invoke('click');
    cy.wait(2000);
}

SetPartABExpands()
{
    cy.get(".mat-content .mat-expansion-panel-header-title").contains('Parts A & B').click(); //Part A &B expands
cy.wait(2000)
}
SetPartABCollapse()
{
    cy.get('#mat-expansion-panel-header-2 >span.mat-expansion-indicator').should('be.visible').invoke('click'); //Part A & B collapse
cy.wait(2000)
}

SetOtherBenefitsExpands()
{
    cy.get(".mat-content .mat-expansion-panel-header-title").contains('Other Benefits').click(); //Other Benefits expands
cy.wait(2000)
}

SetOtherBenefitsCollapse()
{
    cy.get("#mat-expansion-panel-header-3 > span.mat-expansion-indicator").should('be.visible').click({force:true}); //Other Benefits collapse
cy.wait(2000)
}

BackButton='.button-wrapper > .mat-focus-indicator';
SetBackButton()
{
    cy.get(this.BackButton).click();
}

CancelButton='.right-container > .mat-focus-indicator > .mat-button-wrapper';
SetCancelButton()
{
    cy.get(this.CancelButton).contains("Cancel").click()
}

}

export default PlanSelectionSupplement;