Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario Outline: Searching for job

    Given Epam careers page is loaded
    Then Epam logo should be visible
    Then Job search form is visible

    When Select <Country> and <City> in the location filter box
    Then <City> should be displayed in the location filter box

    When Select <Department> in the department filter box
    Then <Department> should be displayed on the page

    When Click on Find button
    Then selected department should be displayed
    Then There should be a job named <Job>
    Then Should have <Country> and <City> as location

    Examples:
    |Country  |City     |Department                            |Job                                |
    |Hungary  |Debrecen |Software, System, and Test Engineering|.NET Developer (Middle/Senior/Lead)|
  