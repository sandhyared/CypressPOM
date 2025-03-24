import LoginPage from '../pages/LoginPage.js';
import LandingPage from '../pages/LandingPage.js';
import HomePage from '../pages/HomePage.js';
import PreferencePage from '../pages/PreferencePage.js'; 
import PrescriptionPage from '../pages/PrescriptionPage.js';
import planselectionPage from '../pages/PlanselectionPage.js';
import LongTermPage from '../pages/LongTermPage.js';
import MedicareAdvantagepage from '../pages/MedicarePage.js';
import PharmacyPage from '../pages/PharmacyPage.js';
import PlanSelectionSupplement from '../pages/PlanSelectionSupplementPage.js';
describe("Automation of test cases for PlanSelection Suppliment Page",()=>{
    const planselectionpage= new planselectionPage();
const PlanSelectionSupplementPage= new PlanSelectionSupplement(); 
    beforeEach("Login to PlanSelectionPage",()=>{
        cy.visit('http://169.61.105.110/medicareAdvantage_sandbox/landing-page ');
        const lPage = new LoginPage();
        const recPage = new LandingPage();
        const homepage = new HomePage();
        const prefPage = new PreferencePage();
        const prescriptionpage=new PrescriptionPage();
        const pharmacypage=new PharmacyPage();
         cy.fixture('LoginFixture').then((data) => {
            
            lPage.setUserName(data.username);
            lPage.setPassword(data.password);
            lPage.clickLoginBtn();
            lPage.verifyLogin(); // Ensure login was successful
        })
           recPage.clickCreateRecommendation();
           cy.wait(100);
           homepage.enterEmail("rani@gmail.com");
           cy.wait(100);
           homepage.clickhealthArrow();
           cy.wait(100);
           homepage.clickGoodHealth();
           cy.wait(100);
           homepage.enterName("Shigapage");
           cy.wait(100);
           homepage.enterLifeexpectancy("86");
           cy.wait(100);
           homepage.datePickerclick();
           cy.wait(100);
           homepage.year1957click();
           cy.wait(100);
           homepage.month1957click();
           cy.wait(100);
           homepage.enterZip("27529")
           cy.wait(100);
           homepage.clickSearch();
           cy.wait(100);
           homepage.nextHomeClick();
           cy.wait(100);
           prefPage.clickyesRadioDrugCost();
         cy.wait(100);
         prefPage.clickNextPrefPage();
         cy.wait(100);
         prescriptionpage.enterDrugSearchBox("Gabapentin");
         cy.wait(100);
         prescriptionpage.selectDrug();
         cy.wait(100);
         prescriptionpage.clickAddToDrug();
        cy.wait(100);
        prescriptionpage.doneAddDrugClick();
        cy.wait(100);
        pharmacypage.clickFindFarmacy();
        cy.wait(100);
        pharmacypage.clickfarmacyOne();
        cy.wait(100);
        pharmacypage.clickfarmacyTwo();
        cy.wait(100);
        pharmacypage.clicknextpharmacy();

})


it("Test1:To verify functionality of supplement button on plan-selection/plan-list/SUPPLEMENT page and to verify that user can select max 3 plans",()=>{
    planselectionpage.SetSupplementButtn()
    cy.wait(5000)
    //cy.viewport(1920, 1080);
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(2);
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(3);
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(4);
    
    PlanSelectionSupplementPage.Max3PlanVerifyMsg();
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);  //validating the uncheck functionality of plan checkbox.

})
  
it("Test2:To verify that user can select only one supplement plan from previously selected 3 plans and able to see the plan details",()=>{
    planselectionpage.SetSupplementButtn()
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(2);
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(3);
    planselectionpage.DoneplanSelectionClick();
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.VerifyMsg(); //asretion ,user can selectonly 1 plan out of selected 3  maximum plans.
    
})
 
it("Test3:To verify the functionality of Medigap plan N ,filter button",()=>{
    planselectionpage.SetMedigapArrow()
    PlanSelectionSupplementPage.SetSelectPlanN()
   planselectionpage.SetSupplementButtn();
   cy.wait(10000)
   PlanSelectionSupplementPage.SetFilterButton() 
   PlanSelectionSupplementPage.FilterByInsuranceCarrier("CIGNA HLTH GRP (61727)")
      
})

it("Test4:To verify the functionality of Medigap plan N ,reset button",()=>{
  planselectionpage.SetMedigapArrow()
  PlanSelectionSupplementPage.SetSelectPlanN()
  planselectionpage.SetSupplementButtn();
  cy.wait(10000)
  PlanSelectionSupplementPage.SetFilterButton() 
   PlanSelectionSupplementPage.FilterByInsuranceCarrier("CIGNA HLTH GRP (61727)")
   PlanSelectionSupplementPage.SetResetButton(); //reset button validation

})

it("Test5:To verify the functionality of Medigap plan N details:PartA ",()=>{
    planselectionpage.SetMedigapArrow()
    PlanSelectionSupplementPage.SetSelectPlanN()
    planselectionpage.SetSupplementButtn();
    cy.wait(10000)
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.SetPlanDetailsButton()         

    PlanSelectionSupplementPage.VerifyHospitalization()  //Hospitalization validation under partA
   
   cy.contains('Skilled Nursing Facility Care').should('exist');   //Skilled Nursing Facility Care validation

   cy.wait(2000)
   cy.contains('Blood').should('exist');  //Blood Validation
   cy.wait(2000)
   cy.contains("Hospice Care").should('exist');  //Hospics Care validation
   PlanSelectionSupplementPage.SetPartAExpandsCollapsIndicator()
})
 
it("Test6:To verify the functionality of Medigap plan N details:PartA:Hospitalization",()=>{
    planselectionpage.SetMedigapArrow()
    PlanSelectionSupplementPage.SetSelectPlanN()
    planselectionpage.SetSupplementButtn();
    cy.wait(10000)
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.SetPlanDetailsButton() 
    PlanSelectionSupplementPage.SetHospitalizationClick()
    cy.get(".mat-expansion-panel-body table.mat-table.cdk-table.detail-table tbody", { timeout: 10000 })
    .should('be.visible') // Check table is visible
   .find('tr') // Find all rows in the table
   .should('have.length.greaterThan', 0) // Ensure at least one row exists
   .each(($row) => {
    cy.wrap($row).find('td').each(($cell) => {
      cy.wrap($cell).invoke('text').should('not.be.empty'); // Ensure each cell has text
    });
  });
})


it("Test7:To verify Part B expands and collapse",()=>{
    planselectionpage.SetMedigapArrow()
    PlanSelectionSupplementPage.SetSelectPlanN()
    planselectionpage.SetSupplementButtn();
    cy.wait(10000)
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.SetPlanDetailsButton()
    PlanSelectionSupplementPage.SetPartBExpands()   //PartB expands
    PlanSelectionSupplementPage.SetPartBCollapse()  //Part B collapse
}) 

it("Test8:To verify Part A & B expands and collapse",()=>{
    planselectionpage.SetMedigapArrow()
    PlanSelectionSupplementPage.SetSelectPlanN()
    planselectionpage.SetSupplementButtn();
    cy.wait(10000)
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.SetPlanDetailsButton()
    PlanSelectionSupplementPage.SetPartABExpands()
    PlanSelectionSupplementPage.SetPartABCollapse()
})

it("Test9:To verify Other Benefits expands and collapse",()=>{
    planselectionpage.SetMedigapArrow()
    PlanSelectionSupplementPage.SetSelectPlanN()
    planselectionpage.SetSupplementButtn();
    cy.wait(10000)
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.SetPlanDetailsButton()
    PlanSelectionSupplementPage.SetOtherBenefitsExpands()
    PlanSelectionSupplementPage.SetOtherBenefitsCollapse()
})
 it("Test10:To verify functionality of Back button on suppliment plan details page",()=>{
    planselectionpage.SetMedigapArrow()
    PlanSelectionSupplementPage.SetSelectPlanN()
    planselectionpage.SetSupplementButtn();
    cy.wait(10000)
    PlanSelectionSupplementPage.SetplanSelectionCheckBox(1);
    PlanSelectionSupplementPage.SetPlanDetailsButton()
    PlanSelectionSupplementPage.SetBackButton() //Back button validation
   cy.wait(2000);
   cy.url().should('eq','http://169.61.105.110/medicareAdvantage_sandbox/plan-selection/plan-list/SUPPLEMENT');
 })

 it("Test 11: To verify the functionality of Cancel button on suppliment planlist page",()=>{
    planselectionpage.SetMedigapArrow()
    PlanSelectionSupplementPage.SetSelectPlanN()
    planselectionpage.SetSupplementButtn();
    cy.wait(10000)
    PlanSelectionSupplementPage.SetCancelButton()  //Cancel button
    cy.url().should("eq","http://169.61.105.110/medicareAdvantage_sandbox/plan-selection");

 })

 it("Test12: To verify functionality of Profile Button",()=>{
    planselectionpage.SetProfileButtn()
    cy.url().should("eq","http://169.61.105.110/medicareAdvantage_sandbox/home");
 })

 it("Test13: To verify functionality of Provider Button",()=>{
    planselectionpage.SetProviderButtn()
    cy.url().should("eq","http://169.61.105.110/medicareAdvantage_sandbox/manage-providers");
 })

 it("Test14: To verify functionality of Prescription Button",()=>{
    planselectionpage.SetPrescriptionButtn()
    cy.url().should("eq","http://169.61.105.110/medicareAdvantage_sandbox/manage-prescriptions");
 })
 
 it("Test15: To verify functionality of Pharmacy Button",()=>{
    planselectionpage.SetPharmacyButtn()
    cy.url().should("eq","http://169.61.105.110/medicareAdvantage_sandbox/manage-pharmacies");

})


})
   
   




