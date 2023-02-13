const homePage = require("./home.page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends homePage {
    /**
     * define selectors using getter methods
     */

    get _cartIcon() {
        return $('//*[@id= "cart"]/button');
    }

    get _miniCart() {
        return $('//*[@id="cart"]/ul');
    }

    get _removeItemFromMiniCart() {
        return $('//*[@id="cart"]/ul/li[1]/table/tbody/tr/td[5]/button');
    }

    get _totalCartAmount(){
        return $('//*[@id="cart-total"]')
    }

    get _viewCart() {
        return $('//*[@id="cart"]/ul/li[2]/div/p/a[1]/strong');
    }

    get _removeItemFromCart() {
        return $('(//*[@data-original-title="Remove"])[1]');
    }

    get _emptyCartPopup(){
        return $('//*[@id = "content"]/p');
    }

    async goToCart() {
        await this._cartIcon.waitForDisplayed();
        await this._cartIcon.click();
    }

    async getTotalCartAmount(){
        let totalCartAmount = (await this._totalCartAmount.getText()).split("$")[1];
        return totalCartAmount;
    }

    async miniCart() {
        await this._miniCart.waitForDisplayed();
    }

    async removeItemFromMiniCart() {
        await this._removeItemFromMiniCart.waitForDisplayed();
        await this._removeItemFromMiniCart.click();
    }

    async viewCart() {
        await this._viewCart.waitForDisplayed();
        await this._viewCart.click();
    }

    async removeItemFromCart() {
        await this.goToCart();
        await this.viewCart();
        await this._removeItemFromCart.waitForDisplayed();
        await this._removeItemFromCart.click();
    }

    async emptyCartPopup(){
        await this._emptyCartPopup.waitForDisplayed();
        return await this._emptyCartPopup;
    }
}

module.exports = new CartPage();













