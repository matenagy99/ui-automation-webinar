class CareerPage {
    constructor() {
        this.logo = element(by.css("img.header__logo"));
        this.acceptCookiesButton = element(by.css("#onetrust-accept-btn-handler"));
        this.searchForm = element(by.css("#jobSearchFilterForm"));

        this.locationInput = element(by.css(".recruiting-search__location"));
        this.locationFiltering = element(by.css("input[role='combobox']"));
        this.countrySelect = country => element(by.css(`li[aria-label='${country}']`));
        this.citySelect = (country,city) => element(by.css(`li[aria-label='${country}'] ul li[id*='${city}']`));
        this.checkLocation = element(by.css(".recruiting-search__location .select2-selection__rendered"));

        this.departmentInput = element(by.css("div.job-search__departments div.selected-params"));
        this.departmentSelectDropdown = element(by.css(".multi-select-dropdown ul"));
        this.departmentSelect = department => element(by.css(`.multi-select-dropdown ul input[data-value='${department}'] + span`));
        this.checkSelectedDepartment = element(by.css("ul.selected-items li:first-child"));
        
        this.findButton = element(by.css("#jobSearchFilterForm > button"));
        this.searchResults = element(by.css(".search-result ul li:last-child"));

        this.formatJobTitle = job => job.toLowerCase().replace(/\s-\s|[\s\/]/g, "-").replace(/[()&]/g, "");
        this.jobResult = job => element(by.css(`.search-result__item .search-result__item-info a[href*='${job}']`));
        this.checkLocationOfJob = job => job.element(by.xpath("./../../strong"));
        this.jobsApplyButton = job => job.element(by.xpath("./../../../div[@class='search-result__item-footer search-result__clearfix']/div/div/a"));

        this.positionName = element(by.css(".recruiting-page__header h1"));
        this.positionLocation = element(by.css(".recruiting-page__location"));

    }

    async load() {
        await browser.get("https://www.epam.com/careers");
        return await browser.wait(ec.elementToBeClickable(this.logo), 10000);
    }

    async selectLocation(country, city) {
        await this.locationInput.click();

        await this.locationFiltering.sendKeys(country.slice(0, 3));
        const countryToClick = this.countrySelect(country);
        await countryToClick.click();

        const cityToClick = this.citySelect(country, city);
        return await cityToClick.click();
    }

    async selectDepartment(department) {
        await this.departmentInput.click();
        await browser.wait(ec.visibilityOf(this.departmentSelectDropdown), 3000);
        const departmentToClick = this.departmentSelect(department);
        return await departmentToClick.click();
    }

    async clickFindButton() {
        await this.findButton.click();
        return await browser.wait(ec.visibilityOf(this.searchResults), 5000);
    }

    async findJobsApplyButton(job) {
        const formattedJobTitle = this.formatJobTitle(job);
        const jobToApply = this.jobResult(formattedJobTitle);
        const applyButtonOfJob = this.jobsApplyButton(jobToApply);
        return new Promise(resolve => {
            resolve(applyButtonOfJob);
        });
    }

}

module.exports = CareerPage;