'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(GLOBAL_TIMEOUT);

Given(/Epam careers page is loaded/, async () => {
    await browser.get("https://www.epam.com/careers");
});

Then(/Epam logo should be visible/ , async () => {
    const logo = element(by.css("a.header__logo-container"));

    const acceptCookies = element(by.css("#onetrust-accept-btn-handler"));
    acceptCookies.click();

    expect(logo.isDisplayed()).to.eventually.be.true;
});

Then(/Job search form is visible/, async () => {
    const searchForm = element(by.css("form#jobSearchFilterForm"));
    expect(searchForm.isDisplayed()).to.eventually.be.true;
});

When(/Select (.*) and (.*) in location filter box/, async (country, city) => {
    const locationInput = element(by.css(".recruiting-search__location"));
    locationInput.click();

    const filtering = element(by.css("input[role='combobox']"));
    filtering.sendKeys(country.slice(0,4));

    const countrySelect = element(by.css(`li[aria-label='${country}']`));
    countrySelect.click();

    const citySelect = element(by.css(`li[aria-label='Hungary'] li[id*='${city}']`));
    citySelect.click();
});

Then(/(.*) should be displayed in the location filter box/, async (city) => {
    const checkLocation = element(by.css(".recruiting-search__location .select2-selection__rendered"));
    expect(checkLocation.getText()).to.eventually.equal(city);
});
