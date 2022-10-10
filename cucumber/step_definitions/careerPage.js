'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const CareerPage = require("../../pageObject/CareerPage");
const careerPage = new CareerPage();

setDefaultTimeout(GLOBAL_TIMEOUT);

Given(/Epam careers page is loaded/, async () => {
    await careerPage.load();
    await careerPage.acceptCookiesButton.click();
});

Then(/Epam logo should be visible/ , async () => {
    expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
});

Then(/Job search form is visible/, async () => {
    expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
});

When(/Select (.*) and (.*) in the location filter box/, async (country, city) => {
    await careerPage.selectLocation(country, city);
});

Then(/(.*) should be displayed in the location filter box/, async (city) => {
    expect(careerPage.checkLocation.getText()).to.eventually.equal(city);
});

When(/Select (.*) in the department filter box/, async (department) => {
    await careerPage.selectDepartment(department);
});

Then(/(.*) should be displayed on the page/, async (department) => {
    expect(careerPage.checkSelectedDepartment.getText()).to.eventually.equal((`${department}`).toUpperCase());
});

When(/Click on Find button/, async () => {
    await careerPage.clickFindButton();
});

Then(/Selected department (.*) should be displayed/, async (department) => {
    expect(careerPage.checkSelectedDepartment.getText()).to.eventually.equal((`${department}`).toUpperCase());
});

Then(/There should be a job named (.*)/, async (job) => {
    const searchedJob = careerPage.jobResult(careerPage.formatJobTitle(job));
    expect(searchedJob.getText()).to.eventually.equal(job);
});

Then(/(.*) should have (.*) and (.*) as location/ , async (job, country, city) => {
    const searchedJob = careerPage.jobResult(careerPage.formatJobTitle(job));
    const locationOfJob = careerPage.checkLocationOfJob(searchedJob);
    expect(locationOfJob.getText()).to.eventually.contain(`${city.toUpperCase()}, ${country.toUpperCase()}`);
});

Then(/(.*) should have an apply button/, async (job) => {
    const applyButton = await careerPage.findJobsApplyButton(job);
    expect(applyButton.isDisplayed()).to.eventually.be.true;
    expect(applyButton.getText()).to.eventually.equal("VIEW AND APPLY");
    applyButton.click();
});

When(/(.*)'s page is loaded/, async (job) => {
    await browser.wait(ec.urlContains(careerPage.formatJobTitle(job)), 5000);
});

Then(/(.*) should be displayed on the site/, async (job) => {
    expect(careerPage.positionName.getText()).to.eventually.contain(`${job}`);
});

Then(/(.*) and (.*) should be dislpayed on the site/, async (country, city) => {
    expect(careerPage.positionLocation.getText()).to.eventually.contain(`${city}, ${country}`);
});