Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario Outline: Searching for job

    Given Epam careers page is loaded
    Then Epam logo should be visible
    Then Job search form is visible

    When Select <Country> and <City> in location filter box
    Then <City> should be displayed in the location filter box



    Examples:
    |Country  |City     |Department                            |
    |Hugary   |Debrecen |Software, System, and Test Engineering|
  