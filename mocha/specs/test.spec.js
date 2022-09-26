"use strict";

describe("Search for job", () => {

    describe("Careers page", () => {
        it("should be opnened", async () => {
            await browser.get("https://www.epam.com/careers");
            const logo = element(by.css("a.header__logo-container"));
            expect(logo.isPresent()).to.eventually.be.true;
        });
    });

    describe("Search form", () => {
        
        it("should be displayed", () => {

        });

        describe("Location filter box", () => {
            it("should provide a way to filter to a specific location", () => {

            });
        });

        describe("Department filter box", () => {
            it("should provide a way to filter to a specific department", () => {

            });
        });

        describe("Searching", () => {
            it("should find the proper job", () => {

            });

            it("should have job with proper department", () => {

            });

            it("should have job with proper location", () => {

            });

            it("should have an apply button for job", () => {

            });

            describe("Applying to position", () => {
                it("should have proper position name in the description", () => {

                });

                it("should have proper location in the description", () => {

                });
            });
        });
    });
});