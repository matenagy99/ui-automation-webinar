"use strict";

const CareerPage = require("../../pageObject/CareerPage");
const careerPage = new CareerPage();

describe("Search for job", async () => {

    beforeEach(async () => {
        careerPage.load();
    });

    describe("Careers page", async () => {
        it("should be opnened", async () => {
            await careerPage.acceptCookiesButton.click();
            return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
        });
    });

    describe("Search form", async () => {
        
        it("should be displayed", async () => {
            return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
        });

        describe("Location filter box", async () => {
            it("should provide a way to filter to a specific location", async () => {
                expect(careerPage.locationInput.isDisplayed()).to.eventually.be.true;

                await careerPage.selectLocation("Hungary", "Debrecen");

                expect(careerPage.checkLocation.getText()).to.eventually.equal("Debrecen");
            });
        });

        describe("Department filter box", async () => {
            it("should provide a way to filter to a specific department", async () => {
                expect(careerPage.departmentInput.isPresent()).to.eventually.be.true;

                // await careerPage.selectDepartment("Software, System, and Test Engineering");

                // expect(careerPage.checkSelectedDepartment).to.eventually.have.length(1);
                // expect(careerPage.checkSelectedDepartment[0].getText()).to.eventually.equal(("Software, System, and Test Engineering").toUpperCase());
            });
        });
        
    //     describe("Searching", async () => {

    //         beforeEach(async () => {
    //             const locationInput = element(by.css(".recruiting-search__location .select2-selection.select2-selection--single"));
    //             locationInput.click();
    //             const filtering = element(by.css("input[role='combobox']"));
    //             filtering.sendKeys("Hu");
    //             const country = element(by.css("li[aria-label='Hungary']"));
    //             country.click();
    //             const city = element(by.css("li[aria-label='Hungary'] li:nth-child(3)"));
    //             city.click();

    //             const departmentInput = element(by.css("#jobSearchFilterForm div[role='combobox']"));
    //             departmentInput.click();
    //             await browser.wait(ec.visibilityOf(element(by.css(".multi-select-dropdown ul")), 3000));
    //             const myDep = element(by.css(".multi-select-dropdown ul input[data-value='Software, System, and Test Engineering'] + span"));
    //             myDep.click();

    //             const findButton = element(by.css("#jobSearchFilterForm > button"));
    //             findButton.click();

    //             await browser.wait(ec.visibilityOf(element(by.css(".search-result ul li:last-child")), 5000));
    //         });

    //         it("should find the proper job", async () => {
    //             const jobResult = element(by.css(".search-result__item .search-result__item-info a[href*='net-developer-middle-senior-lead_debrecen_hungary']"));
    //             expect(jobResult.getText()).to.eventually.equal(".NET Developer (Middle/Senior/Lead)");
    //         });

    //         it("should have job with proper department", async () => {
    //             const selected = await element.all(by.css(".selected-items li"));
    //             expect(selected).to.have.length(1);
    //             expect(selected[0].getText()).to.eventually.equal(("Software, System, and Test Engineering").toUpperCase());
    //         });

    //         it("should have job with proper location", async () => {
    //             const jobResult = element(by.css(".search-result__item .search-result__item-info a[href*='net-developer-middle-senior-lead_debrecen_hungary']"));
    //             const locationOfJob = jobResult.element(by.xpath("./../../strong"))
    //             expect(locationOfJob.getText()).to.eventually.equal("DEBRECEN, HUNGARY OR REMOTE");
    //         });

    //         it("should have an apply button for job", async () => {
    //             const applyButton = element(by.css(".search-result__item-footer a[href*='net-developer-middle-senior-lead_debrecen_hungary']"));
    //             expect(applyButton.isDisplayed()).to.eventually.be.true;
    //             expect(applyButton.getText()).to.eventually.equal("VIEW AND APPLY");
    //             await applyButton.click();
    //         });

    //         describe("Applying to position", async () => {

    //             beforeEach(async () => {
    //                 const jobResult = element(by.css(".search-result__item .search-result__item-info a[href*='net-developer-middle-senior-lead_debrecen_hungary']"));
    //                 await jobResult.click();
    //                 await browser.wait(ec.urlIs("https://www.epam.com/careers/job-listings/job.72856.net-developer-middle-senior-lead_debrecen_hungary"), 5000);
    //             });

    //             it("should have proper position name in the description", async () => {
    //                 const positionName = element(by.css(".recruiting-page__header h1"));
    //                 expect(positionName.getText()).to.eventually.contain(".NET Developer (Middle/Senior/Lead)");
    //             });

    //             it("should have proper location in the description", async () => {
    //                 const positionLocation = element(by.css(".recruiting-page__location"));
    //                 expect(positionLocation.getText()).to.eventually.equal("Debrecen, Hungary or Remote");
    //             });
    //         });
    //     });
    });
});