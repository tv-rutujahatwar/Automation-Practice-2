const { Given, When, Then } = require("@wdio/cucumber-framework");

const loginPage = require("../../src/pageobjects/login.page");
const HomePage = require("../../src/pageobjects/home.page");
const cartPage = require("../../src/pageobjects/cart.page");
const { productList, cartAmount } = require("../data/product.details");
const chai = require('chai');
const homePage = new HomePage();
const expectChai = chai.expect;
const {userDetails} = require("../data/login.details");
const { logout } = require("../../src/pageobjects/login.page");


Given(/^user is on homepage$/, async () => {
    browser.url("http://tutorialsninja.com/demo/index.php?route=common/home");
    await browser.maximizeWindow();
});

When(/^user search for the product using product id and added the product to cart$/, async () => {
    let productCollection = productList.DEFAULT_PRODUCT;
    let cartTotal = 0;
    for(let i=0; i<productCollection.length; i++){
        let product = productCollection[i];
        await homePage.searchBoxInput(product);
        await homePage.pageScroll();
        await homePage.addToCart();
        cartTotal+=productList.DEFAULT_PRICE[i];
    }
    cartAmount.cartTotal = cartTotal;
});

When(/^user scrolls down$/, async () => {
    await homePage.pageScroll();
});

When(/^user remove the product from cart by clicking on cross icon$/, async () => {
    await cartPage.removeItemFromCart();
});

When(/^user clicks on My Account$/, async () => {
    await homePage.myAccount();
});

When(/^user clicks on "Register" button$/, async () => {
    await homePage.register();
});

When(/^user enters all the mandatory fields and clicks on Continue button$/, async () => {
    await loginPage.registerUser();
});

When(/^user navigate to logout$/, async() => {
    await homePage.myAccount();
    await homePage.logout();
});

When(/^user clicks on "Login" button$/, async () => {
    await homePage.login();
});

When(/^user enters valid email id and password in the fields and click on login$/, async () => {
    await loginPage.login();

});

When(/^user clicks on each submenu one by one available in the "Top Menu Bar"$/, async() =>{
    await homePage.allTopMenuNavigation();
});

Then(/^validate searched product been added to cart$/, async () => {
    expectChai(await (await homePage.addToCartPopup()).getText()).to.include("Success: You have added ");
});

Then(/^validate the cart amount for both the product$/, async() => {
    let totalCartAmount = await cartPage.getTotalCartAmount();
    expectChai(totalCartAmount).to.include(cartAmount.cartTotal)
});

Then(/^validate the item got removed from cart$/, async () => {
    let totalCartAmount = await cartPage.getTotalCartAmount();
    expectChai(totalCartAmount).to.include(productList.DEFAULT_PRICE[1]);
});

Then(/^validate user able to register to the site$/, async () => {
    expectChai(await loginPage.successMessage()).to.include("Your Account Has Been Created!");
});

Then(/^validate user able to logout from the site$/, async () => {
    expectChai(await homePage.logoutText()).to.include("Account Logout");
});

Then(/^validate user able to login to the site$/, async() => {
    expectChai(await loginPage.afterLoginScreen()).to.include("My Account");
});