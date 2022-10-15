"use strict";

const CareerPage = require("../../pageObject/CareerPage");
const careerPage = new CareerPage();
const testData = require("./test.json");

testData.forEach(search => {
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
                    await careerPage.selectLocation(search.country, search.city);
                    expect(careerPage.checkLocation.getText()).to.eventually.equal(search.city);
                });
            });

            describe("Department filter box", async () => {
                it("should provide a way to filter to a specific department", async () => {
                    expect(careerPage.departmentInput.isPresent()).to.eventually.be.true;
                    await careerPage.selectDepartment(search.department);
                    expect(careerPage.checkSelectedDepartment.getText()).to.eventually.equal((search.department.toUpperCase()));
                });
            });
            
            describe("Searching", async () => {

                before(async () => {
                    await careerPage.clickFindButton();
                });

                it("should find the proper job", async () => {
                    const searchedJob = careerPage.jobResult(careerPage.formatJobTitle(search.job));
                    expect(searchedJob.getText()).to.eventually.equal(search.job);
                });

                it("should have job with proper department", async () => {
                    expect(careerPage.checkSelectedDepartment.getText()).to.eventually.equal((search.department.toUpperCase()));
                });

                it("should have job with proper location", async () => {
                    const searchedJob = careerPage.jobResult(careerPage.formatJobTitle(search.job));
                    const locationOfJob = careerPage.checkLocationOfJob(searchedJob);
                    expect(locationOfJob.getText()).to.eventually.contain(`${search.city.toUpperCase()}, ${search.coutryShortForm.toUpperCase()}`);
                });

                it("should have an apply button for job", async () => {
                    const applyButton = await careerPage.findJobsApplyButton(search.job);
                    expect(applyButton.isDisplayed()).to.eventually.be.true;
                    expect(applyButton.getText()).to.eventually.equal("VIEW AND APPLY");
                    await applyButton.click();
                });

                describe("Applying to position", async () => {

                    before(async () => {
                        await browser.wait(ec.urlContains(careerPage.formatJobTitle(search.job)), 10000);
                    });

                    it("should have proper position name in the description", async () => {
                        expect(careerPage.positionName.getText()).to.eventually.contain(search.job);
                    });

                    it("should have proper location in the description", async () => {
                        expect(careerPage.positionLocation.getText()).to.eventually.contain(`${search.city}, ${search.coutryShortForm}`);
                    });
                });
            });
        });
    });
});