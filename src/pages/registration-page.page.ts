import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base-page.page'
import { type User } from '../data/customer';
import { LoginPage } from './login-page.page';

export class RegistrationPage extends BasePage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly dobInput: Locator;
    readonly countrySelect: Locator;
    readonly postalCodeInput: Locator;
    readonly houseNumberInput: Locator
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator
    readonly passwordInput: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        super(page)

        this.firstNameInput = page.locator('[data-test="first-name"]');
        this.lastNameInput = page.locator('[data-test="last-name"]');
        this.dobInput = page.locator('[data-test="dob"]');
        this.countrySelect = page.locator('[data-test="country"]');
        this.postalCodeInput = page.locator('[data-test="postal_code"]');
        this.houseNumberInput = page.locator('[data-test="house_number"]');
        this.streetInput = page.locator('[data-test="street"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.phoneInput = page.locator('[data-test="phone"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.registerButton = page.locator('[data-test="register-submit"]');
    }

    async registerCustomer(customer: User) {
        await this.firstNameInput.fill(customer.first_name);
        await this.lastNameInput.fill(customer.last_name);
        await this.dobInput.fill(customer.dob);
        await this.countrySelect.selectOption({ label: customer.address.country });
        await this.postalCodeInput.fill(customer.address.postal_code);
        await this.houseNumberInput.fill(customer.address.house_numnber);

        if (customer.address.street) {
            await this.streetInput.fill(customer.address.street);
        }
        else {
            await expect(this.streetInput).not.toBeEmpty();
        }
        if (customer.address.city) {
            await this.cityInput.fill(customer.address.city);
        }
        else {
            await expect(this.cityInput).not.toBeEmpty();

        }
        if (customer.address.state) {
            await this.stateInput.fill(customer.address.state);
        }
        else {
            await expect(this.stateInput).not.toBeEmpty();
        }

        await this.phoneInput.fill(customer.phone);
        await this.emailInput.fill(customer.email);
        await this.passwordInput.fill(customer.password);

        await this.registerButton.click();

        return new LoginPage(this.page);
    }


}