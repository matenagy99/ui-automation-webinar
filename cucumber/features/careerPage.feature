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
    Then Selected department <Department> should be displayed
    Then There should be a job named <Job>
    Then <Job> should have <Country> and <City> as location
    Then <Job> should have an apply button

    When Click on <Job>'s apply button
    # Then <Job> should be displayed on the site
    # Then <Country> and <City> should be dislpayed on the site

    Examples:
    |Country  |City     |Department                            |Job                                |
    |Hungary  |Debrecen |Software, System, and Test Engineering|.NET Developer (Middle/Senior/Lead)|
  