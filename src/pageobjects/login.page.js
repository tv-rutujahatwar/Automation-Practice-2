const homePage = require("./home.page");
const { userDetails } = require("../../test/data/login.details");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends homePage {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $("//*[@id= 'input-email']");
    }

    get inputPassword() {
        return $("//*[@id= 'input-password']");
    }

    get btnLogin() {
        return $("//*[@id='content']/div/div[2]/div/form/input");
    }

    get _afterLoginScreen(){
        return $("//*[@id='content']/h2[1]")
    }

    async login() {
       // let email = await (this.userDetails.email)
        // let password = await (this.registerUser.password)
        await this.inputUsername.setValue(userDetails.email);
        await this.inputPassword.setValue(userDetails.password);
        await this.btnLogin.click();
    }

    async afterLoginScreen() {
        await this._afterLoginScreen.waitForDisplayed();
        let loginText = await this._afterLoginScreen.getText();
        return loginText;
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open("login");
    }

    // Register Page Locators and methods

    get _firstName() {
        return $("//input[@id= 'input-firstname']");
    }

    get _lastName() {
        return $("//input[@id= 'input-lastname']");
    }

    get _emailId() {
        return $("//input[@id= 'input-email']");
    }

    get _phoneNumber() {
        return $("//input[@id= 'input-telephone']");
    }

    get _password() {
        return $("//input[@id= 'input-password']");
    }

    get _confirmPassword() {
        return $("//input[@id= 'input-confirm']");
    }

    get _privacyPolicyCheckbox() {
        return $("//*[@id= 'content']/form/div/div/input[1]");
    }

    get _btnContinue1() {
        return $("//*[@id= 'content']/form/div/div/input[2]");
    }

    get _SuccessMessage() {
        return $("//*[@id= 'content']/h1");
    }

    get _btnContinue2() {
        return $("//*[@id= 'content']/div/div/a");
    }

    async getFirstName() {
        let firstName = (Math.random() + 1).toString(36).substring(7);
        userDetails.firstName = firstName;
        return firstName;
    }

    async getLastName() {
        let lastName = (Math.random() + 1).toString(36).substring(7);
        userDetails.lastName = lastName;
        return lastName;
    }

    async getEmail(firstName) {
        let email = firstName + "123@example.com";
        userDetails.email = email;
        return email;
    }

    async getPhoneNo() {
        let mob = Math.floor(Math.random() * 10000000000);
        userDetails.mob = mob;
        return mob;
    }

    async getPassword(firstName) {
        let password = firstName + "@" + Math.floor(Math.random() * 100000);
        userDetails.password = password;
        return password;
    }

    async registerUser() {
        let firstName = await this.getFirstName();
        let lastName = await this.getLastName();
        let email = await this.getEmail(firstName);
        let mob = await this.getPhoneNo();
        let password = await this.getPassword(firstName);
        await (await this._firstName).setValue(firstName);
        await (await this._lastName).setValue(lastName);
        await (await this._emailId).setValue(email);
        await (await this._phoneNumber).setValue(mob);
        await (await this._password).setValue(password);
        await (await this._confirmPassword).setValue(password);
        await (await this._privacyPolicyCheckbox).click();
        await this._btnContinue1.click();
    }

    async continueBtn2(){
        await this._btnContinue2.waitForDisplayed();
        await this._btnContinue2.click();
    }

    async successMessage() {
        await this._SuccessMessage.waitForDisplayed();
        let text = await this._SuccessMessage.getText();
        return text;
    }
}

module.exports = new LoginPage();
