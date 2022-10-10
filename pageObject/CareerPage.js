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
        this.checkSelectedDepartment = element.all(by.css(".selected-items li"));
        
        this.findButton = element(by.css("#jobSearchFilterForm > button"));
        this.searchResults = element(by.css(".search-result ul li:last-child"));

        this.formatJobTitle = job => job.toLowerCase().replace(/[\s\/]/g, "-").replace(/[()]/g, "");
        this.jobResult = job => element(by.css(`.search-result__item .search-result__item-info a[href*='${job}']`));
        this.jobsApplyButton = job => job.element(by.xpath("./../../../div[@class='search-result__item-footer search-result__clearfix']/div/div/a"));

        this.positionName = element(by.css(".recruiting-page__header h1"));
        this.positionLocation = element(by.css(".recruiting-page__location"));

    }

    async load() {
        await browser.get("https://www.epam.com/careers");
        await browser.wait(ec.elementToBeClickable(this.logo), 10000);
    }

    async selectLocation(country, city) {
        await this.locationInput.click();

        await this.locationFiltering.sendKeys(country.slice(0, 3));
        const countryToClick = this.countrySelect(country);
        await countryToClick.click();

        const cityToClick = this.citySelect(country, city);
        await cityToClick.click()
    }

    async selectDepartment(department) {
        await this.departmentInput.click();
        await browser.wait(ec.visibilityOf(this.departmentSelectDropdown), 3000);
        const departmentToClick = this.departmentSelect(department);
        await departmentToClick.click();
    }

    async searchForJobs() {
        await this.findButton.click();
        await browser.wait(ec.visibilityOf(this.searchResults), 5000);
    }

    async clickJobsApplyButton(job) {
        const formattedJobTitle = this.formatJobTitle(job);
        const jobToApply = this.jobResult(formattedJobTitle);
        const applyButtonOfJob = this.jobsApplyButton(jobToApply);
        await applyButtonOfJob.click();
    }

}

module.exports = CareerPage;