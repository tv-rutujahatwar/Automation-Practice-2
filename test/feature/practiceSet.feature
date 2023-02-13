Feature: Practice Set 1

  @TC-01
  Scenario: Verify that user can add a product to their cart
    Given user is on homepage
    When user search for the product using product id and added the product to cart
    Then validate searched product been added to cart
    Then validate the cart amount for both the product
    When user remove the product from cart by clicking on cross icon
    Then validate the item got removed from cart

  @TC-02
  @TC-03
  Scenario: Verify user can register
    Given user is on homepage
    When user clicks on My Account
    When user clicks on "Register" button
    When user enters all the mandatory fields and clicks on Continue button
    Then validate user able to register to the site
    When user navigate to logout
    Then validate user able to logout from the site

  @TC-03
  Scenario: Verify use can login
    Given user is on homepage
    When user clicks on My Account
    When user clicks on "Login" button
    When user enters valid email id and password in the fields and click on login
    Then validate user able to login to the site

  @TC-04
  Scenario: Verify user can navigate to all options from the top menu bar
    Given user is on homepage
    When user clicks on each submenu one by one available in the "Top Menu Bar"
    Then validate user able to navigate to the respective listing page after selecting