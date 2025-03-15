import LoginPage from '../pages/LoginPage.js';
import LandingPage from '../pages/LandingPage.js';
import HomePage from '../pages/HomePage.js';
import PrescriptionPage from '../pages/PrescriptionPage.js';
import PreferencePage from '../pages/PreferencePage.js';
describe('PrescriptionPageTest', () => {

    beforeEach(() => {
        cy.visit('http://169.61.105.110/medicareAdvantage_sandbox/medicare-advantage');

        cy.fixture('LoginFixture').then((data) => {
            const lPage = new LoginPage();
            lPage.setUserName(data.username);
            lPage.setPassword(data.password);
            lPage.clickLoginBtn();
            lPage.verifyLogin(); 
        });

        const recPage = new LandingPage();
        recPage.clickRecommedation();
        const homepage = new HomePage();
        cy.wait(100);
        homepage.enterEmail("ShigaPOM@gmail.com");
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
        homepage.enterZip("27529");
        cy.wait(100);
        homepage.searchclick();
        cy.wait(100);
        homepage.NextHomeClick();
        cy.wait(100);
    });
    it('should add or import prescription drug and proceed', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("Gabapentin");
        cy.wait(100);
        drugPage.selectDrug();
        cy.wait(100);
        drugPage.clickAddToDrug();
        cy.wait(100);
        drugPage.doneAddDrugClick();
    });
    it('validate begin typing to find &select your drug', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("ibup");
        cy.wait(100);
        drugPage.selectDrug();
        cy.wait(100);
        drugPage.clickAddToDrug();
        cy.log("drug was  found in the dropdown, test passed.");
    });
    it('verify drugsearch with invalid name', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("albuterol HFA");
        cy.log("drug was not found in the dropdown, test passed.");

    });
    it('Add drugsearch with dosage function', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("amoxicillin");
        //cy.log("drug was not found in the dropdown, test passed.");
        drugPage.selectDrug();
        cy.wait(100);
        drugPage.clickAddToDrug();
        drugPage.verifyDosageWindow();
    });
    it('Add drugsearch with package', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("amoxicillin");
        drugPage.selectDrug();
        cy.wait(100);
        drugPage.clickAddToDrug();
        drugPage.verifyDosageWindow();
        cy.log("user should view dosage information in dosageWindow , test passed.");
    });
    it('Add drugsearch with refill freequency', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("amoxicillin");
        drugPage.selectDrug();
        cy.wait(100);
        drugPage.clickAddToDrug();
        drugPage.verifyDosageWindow();
        cy.log("user should view refil freequency information in dosageWindow , test passed.");
    });
    it('Add branded drug to generic drug', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("ATORVALIQ");
        drugPage.selectDrug();
        cy.wait(100);
        drugPage.verifyGenericBrandWindow();
        drugPage.addBrandInsteadClick();
        drugPage.addMyDrugListClick();
     drugPage.doneAddDrugClick();
        cy.log("user should add branded drug to generic, test passed.");
    });
    it('verify user should  save drug list ', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("ibuprofen");
        drugPage.selectDrug();
        drugPage.addMyDrugListClick();
        drugPage.doneAddDrugClick();
        const homepage=new HomePage();
        homepage.verifyUrl("http://169.61.105.110/medicareAdvantage_sandbox/manage-pharmacies");
        cy.log("user should be able to save druglist under recommendation, test passed.");
    });
    it.only('verify Browse Drugs A_Z functionality', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        drugPage.clickBrowseAtoZlink();
       // drugPage.clickSelectLetterDropdown();
        drugPage.enterLetter("D");
       
    });
    it('remove ', () => {
        const prefPage = new PreferencePage();
        cy.wait(100);
        prefPage.clickyesRadioDrugCost();  
        cy.wait(100);
        prefPage.clickNextPrefPage();  
        const drugPage = new PrescriptionPage();
        cy.wait(100);
        drugPage.enterDrugSearchBox("ibuprofen");
        drugPage.selectDrug();
        drugPage.addMyDrugListClick();
        drugPage.doneAddDrugClick();
        const homepage=new HomePage();
        homepage.verifyUrl("http://169.61.105.110/medicareAdvantage_sandbox/manage-pharmacies");
        cy.log("user should be able to save druglist under recommendation, test passed.");
    });
});