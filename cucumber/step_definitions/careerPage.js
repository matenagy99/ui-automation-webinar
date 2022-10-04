'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(GLOBAL_TIMEOUT);

Given(/Epam careers page is loaded/, async () => {
    await browser.get("https://www.epam.com/careers");
});

Then(/Epam logo should be visible/ , async () => {
    const logo = element(by.css("img.header__logo"));

    const acceptCookies = element(by.css("#onetrust-accept-btn-handler"));
    await acceptCookies.click();

    expect(logo.isDisplayed()).to.eventually.be.true;
});

Then(/Job search form is visible/, async () => {
    const searchForm = element(by.css("form#jobSearchFilterForm"));
    expect(searchForm.isDisplayed()).to.eventually.be.true;
});

When(/Select (.*) and (.*) in the location filter box/, async (country, city) => {
    const locationInput = element(by.css(".recruiting-search__location"));
    await locationInput.click();

    const filtering = element(by.css("input[role='combobox']"));
    await filtering.sendKeys(country.slice(0,3));

    const countrySelect = element(by.css(`li[aria-label='${country}']`));
    await countrySelect.click();

    const citySelect = element(by.css(`li[aria-label='${country}'] ul li[id*='${city}']`));
    await citySelect.click();
});

Then(/(.*) should be displayed in the location filter box/, async (city) => {
    const checkLocation = element(by.css(".recruiting-search__location .select2-selection__rendered"));
    expect(checkLocation.getText()).to.eventually.equal(city);
});

When(/Select (.*) in the department filter box/, async (department) => {
    const departmentInput = element(by.css("#jobSearchFilterForm div[role='combobox']"));
    expect(departmentInput.isDisplayed()).to.eventually.be.true;
    await departmentInput.click();

    await browser.wait(ec.visibilityOf(element(by.css(".multi-select-dropdown ul")), 2000));
    const myDep = element(by.css(".multi-select-dropdown ul input[data-value='Software, System, and Test Engineering'] + span"));
    await myDep.click();
});

Then(/(.*) should be displayed on the page/, async (department) => {
    const selected = await element.all(by.css(".selected-items li"));
    expect(selected).to.have.length(1);
    expect(selected[0].getText()).to.eventually.equal((`${department}`).toUpperCase());
});

When(/Click on Find button/, async () => {
    const findButton = element(by.css("#jobSearchFilterForm > button"));
    await findButton.click();
    await browser.wait(ec.visibilityOf(element(by.css(".search-result ul li:last-child")), 5000));
});

Then(/Selected department (.*) should be displayed/, async (department) => {
    const checkDepartment = await element.all(by.css(".selected-items li"));
    expect(checkDepartment).to.have.length(1);
    expect(checkDepartment[0].getText()).to.eventually.equal((`${department}`).toUpperCase());
});

Then(/There should be a job named (.*)/, async (job) => {
    const formattedJobTitle = job.toLowerCase().replace(/[\s\/]/g, "-").replace(/[()]/g, "");
    const jobResult = element(by.css(`.search-result__item .search-result__item-info a[href*='${formattedJobTitle}']`));
    expect(jobResult.getText()).to.eventually.equal(".NET Developer (Middle/Senior/Lead)");
});

Then(/(.*) should have (.*) and (.*) as location/ , async (job, country, city) => {
    const formattedJobTitle = job.toLowerCase().replace(/[\s\/]/g, "-").replace(/[()]/g, "");
    const jobResult = element(by.css(`.search-result__item .search-result__item-info a[href*='${formattedJobTitle}']`));

    const locationOfJob = jobResult.element(by.xpath("./../../strong"))
    expect(locationOfJob.getText()).to.eventually.contain(`${city.toUpperCase()}, ${country.toUpperCase()}`);
});

Then(/(.*) should have an apply button/, async (job) => {
    const formattedJobTitle = job.toLowerCase().replace(/[\s\/]/g, "-").replace(/[()]/g, "");
    const jobResult = element(by.css(`.search-result__item .search-result__item-info a[href*='${formattedJobTitle}']`));

    const applyButton = jobResult.element(by.xpath("./../../../div[@class='search-result__item-footer search-result__clearfix']/div/div/a"));
    expect(applyButton.getText()).to.eventually.equal("VIEW AND APPLY");
});

When(/Click on (.*)'s apply button/, async (job) => {
    const formattedJobTitle = job.toLowerCase().replace(/[\s\/]/g, "-").replace(/[()]/g, "");
    const jobResult = element(by.css(`.search-result__item .search-result__item-info a[href*='${formattedJobTitle}']`));

    const applyButton = jobResult.element(by.xpath("./../../../div[@class='search-result__item-footer search-result__clearfix']/div/div/a"));
    await applyButton.click();

});

Then(/(.*) should be displayed on the site/, async (job) => {
    const positionName = element(by.css(".recruiting-page__header h1"));
    expect(positionName.getText()).to.eventually.contain(`${job}`);
});

Then(/(.*) and (.*) should be dislpayed on the site/, async (country, city) => {
    const positionLocation = element(by.css(".recruiting-page__location"));
    expect(positionLocation.getText()).to.eventually.contain(`${city}, ${country}`);
});