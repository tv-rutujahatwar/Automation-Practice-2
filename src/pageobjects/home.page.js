const { topMenuOptions, nonDropdownOptions } = require("../../test/data/product.details");
const chai = require("chai");
const expectChai = chai.expect;

class HomePage {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url("");
    }

    get _searchbox() {
        return $("//*[@id= 'search']//input");
    }

    get _searchIcon() {
        return $("//*[@id='search']/span/button");
    }

    get _addToCartButton() {
        return $("//*[@id='content']/div[3]/div/div/div[2]/div[2]/button[1]");
    }

    get _addToCartPopup() {
        return $("//*[@class= 'alert alert-success alert-dismissible']");
    }

    get _myAccount() {
        return $('//*[@id="top-links"]/ul/li[2]/a/span[1]');
    }

    get _register() {
        return $('//*[@id="top-links"]/ul/li[2]/ul/li[1]/a');
    }

    get _login() {
        return $("//*[@id= 'top-links']/ul/li[2]/ul/li[2]");
    }

    get _logout() {
        return $("//*[@id='top-links']/ul/li[2]/ul/li[5]/a");
    }

    get _logoutText() {
        return $("//*[@id='content']/h1");
    }

    _getAllTopMenuDropdown(i) {
        return $$("//*[@class='dropdown-toggle']")[i];
    }

    _getAllTopMenuNonDropdown(i) {
        return $(`//*[@id='menu']/div[2]/ul/li[${i}]`);
    }

    _getSeeAllOptions(i){
        return $$("//*[@class='see-all']")[i-1];
    }

    get _optionLabel(){
        return $(".col-sm-9>h2");
    }

    async searchBoxInput(productList) {
        await (await this._searchbox).waitForDisplayed();
        await this._searchbox.setValue(productList);
        await this._searchIcon.click();
    }

    async pageScroll() {
        await this._addToCartButton.scrollIntoView();
    }

    async addToCart() {
        await this._addToCartButton.waitForDisplayed();
        await this._addToCartButton.click();
        await browser.pause(5000);
    }

    async addToCartPopup() {
        await this._addToCartPopup.waitForDisplayed();
        return await this._addToCartPopup;
    }

    async myAccount() {
        await this._myAccount.waitForDisplayed();
        await this._myAccount.click();
    }

    async register() {
        await this._register.waitForDisplayed();
        await this._register.click();
    }

    async login() {
        await this._login.waitForDisplayed();
        await this._login.click();
    }

    async logout() {
        await this._logout.waitForDisplayed();
        await this._logout.click();
    }

    async logoutText() {
        await this._logoutText.waitForDisplayed();
        let logoutMessage = await this._logoutText.getText();
        return logoutMessage;
    }

    async allTopMenuNavigation() {

        for (let i = 1; i <= topMenuOptions.length; i++) {
            await this._getAllTopMenuDropdown(i).waitForDisplayed();
            await this._getAllTopMenuDropdown(i)
                .moveTo()
                .then(async () => {
                    // browser.pause(3000);
                    await (await this._getSeeAllOptions(i)).waitForDisplayed();
                    await (await this._getSeeAllOptions(i)).click();
                    expectChai(await (await this._optionLabel).getText()).to.be.equal(topMenuOptions[i-1]);
                    await browser.pause(100);
                });
        }
        for (let i=4; i<=6; i++){
            await this._getAllTopMenuNonDropdown(i).waitForDisplayed();
            await this._getAllTopMenuNonDropdown(i).click();
            expectChai(await (await this._optionLabel).getText()).to.be.equal(nonDropdownOptions[i - 4]);
        }
    }
}
module.exports = HomePage;
