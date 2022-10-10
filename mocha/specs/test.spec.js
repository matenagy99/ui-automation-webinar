"use strict";

const CareerPage = require("../../pageObject/CareerPage");
const careerPage = new CareerPage();

describe("Search for job", async () => {

    before(async () => {
        await careerPage.load();
    });

    describe("Careers page", async () => {
        it("should be opnened", async () => {
            await careerPage.acceptCookiesButton.click();
            expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
        });
    });

    describe("Search form", async () => {
        
        it("should be displayed", async () => {
            expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
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
                await careerPage.selectDepartment("Software, System, and Test Engineering");
                expect(careerPage.checkSelectedDepartment.getText()).to.eventually.equal(("SOFTWARE, SYSTEM, AND TEST ENGINEERING"));
            });
        });
        
        describe("Searching", async () => {

            before(async () => {
                await careerPage.clickFindButton();
            });

            it("should find the proper job", async () => {
                const searchedJob = careerPage.jobResult(careerPage.formatJobTitle(".NET Developer (Middle/Senior/Lead)"));
                expect(searchedJob.getText()).to.eventually.equal(".NET Developer (Middle/Senior/Lead)");
            });

            it("should have job with proper department", async () => {
                expect(careerPage.checkSelectedDepartment.getText()).to.eventually.equal(("SOFTWARE, SYSTEM, AND TEST ENGINEERING"));
            });

            it("should have job with proper location", async () => {
                const searchedJob = careerPage.jobResult(careerPage.formatJobTitle(".NET Developer (Middle/Senior/Lead)"));
                const locationOfJob = careerPage.checkLocationOfJob(searchedJob);
                expect(locationOfJob.getText()).to.eventually.equal("DEBRECEN, HUNGARY OR REMOTE");
            });

            it("should have an apply button for job", async () => {
                const applyButton = await careerPage.findJobsApplyButton(".NET Developer (Middle/Senior/Lead)");
                expect(applyButton.isDisplayed()).to.eventually.be.true;
                expect(applyButton.getText()).to.eventually.equal("VIEW AND APPLY");
                await applyButton.click();
            });

            describe("Applying to position", async () => {

                before(async () => {
                    await browser.wait(ec.urlContains(careerPage.formatJobTitle(".NET Developer (Middle/Senior/Lead)")), 10000);
                });

                it("should have proper position name in the description", async () => {
                    expect(careerPage.positionName.getText()).to.eventually.contain(".NET Developer (Middle/Senior/Lead)");
                });

                it("should have proper location in the description", async () => {
                    expect(careerPage.positionLocation.getText()).to.eventually.equal("Debrecen, Hungary or Remote");
                });
            });
        });
    });
});