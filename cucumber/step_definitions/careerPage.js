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
    // await browser.wait(ec.visibilityOf(element(by.css("ul[id$=copy-location-results]"))), 5000);
    const filtering = element(by.css("input[role='combobox']"));
    await filtering.sendKeys(country.slice(0,3));

    const countrySelect = element(by.css(`li[aria-label='${country}']`));
    await countrySelect.click();
    // await browser.wait(ec.visibilityOf(element(by.css(`li[aria-label=${country}] ul li:last-child`))), 5000);

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
});

Then(/selected department should be displayed/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then(/There should be a job named (.)/, async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then(/Should have Hungary and Debrecen as location/ , async () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});