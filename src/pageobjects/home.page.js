/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
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

    get _logoutText(){
        return $("//*[@id='content']/h1");
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

    async logoutText(){
        await this._logoutText.waitForDisplayed();
        let logoutMessage = await this._logoutText.getText();
        return logoutMessage;
    }
};
module.exports = HomePage