import { BasePage } from './base-page.page';
import { Page, Locator, expect } from '@playwright/test'
import {
    PaymentMethod,
    PaymentDetails,
    BankTransferDetails,
    CreditCardDetails,
    BuyNowPayLaterDetails,
    GiftCardDetails,
} from '../data/enum/payment.enum';
import { fillOrAssertNotEmpty } from '../utils/form.util';


export class CheckoutPage extends BasePage {

    readonly proceedToCheckoutButton: Locator;
    readonly signinStep: Locator;
    readonly cartStep: Locator;
    readonly billingStep: Locator;
    readonly countrySelect: Locator;
    readonly postalCodeInput: Locator;
    readonly houseNumberInput: Locator
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;

    readonly paymentMethodSelect: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;
    readonly orderConfirmMessage: Locator;
    readonly paymentErrorMessage: Locator;

    readonly bankNameInput: Locator;
    readonly accountNameInput: Locator;
    readonly accountNumberInput: Locator;

    readonly creditCardNumberInput: Locator;
    readonly expirationDateInput: Locator;
    readonly cvvInput: Locator;
    readonly cardHolderNameInput: Locator;

    readonly monthlyInstallmentsSelect: Locator;

    readonly giftCardNumberInput: Locator;
    readonly validationCodeInput: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to checkout', exact: true });
        this.cartStep = page.locator('li').filter({ hasText: 'Cart' });
        this.signinStep = page.locator('li').filter({ hasText: 'Sign in' });
        this.billingStep = page.locator('li').filter({ hasText: 'Billing Address' });

        this.countrySelect = page.locator('[data-test="country"]');
        this.postalCodeInput = page.locator('[data-test="postal_code"]');
        this.houseNumberInput = page.locator('[data-test="house_number"]');
        this.streetInput = page.locator('[data-test="street"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('[data-test="payment-success-message"]');
        this.orderConfirmMessage = page.locator('#order-confirmation');
        this.paymentErrorMessage = page.locator('[data-test="payment-error-message"]');

        this.bankNameInput = page.locator('[data-test="bank_name"]');
        this.accountNameInput = page.locator('[data-test="account_name"]');
        this.accountNumberInput = page.locator('[data-test="account_number"]');

        this.creditCardNumberInput = page.locator('[data-test="credit_card_number"]');
        this.expirationDateInput = page.locator('[data-test="expiration_date"]');
        this.cvvInput = page.locator('[data-test="cvv"]');
        this.cardHolderNameInput = page.locator('[data-test="card_holder_name"]');

        this.monthlyInstallmentsSelect = page.locator('[data-test="monthly_installments"]');

        this.giftCardNumberInput = page.locator('[data-test="gift_card_number"]');
        this.validationCodeInput = page.locator('[data-test="validation_code"]');
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async fillBillingAddress(country, postal_code, house_numnber, street?, city?, state?) {
        await this.countrySelect.selectOption({ label: country });
        await this.postalCodeInput.fill(postal_code);
        await this.houseNumberInput.fill(house_numnber);

        await fillOrAssertNotEmpty(this.streetInput, street);
        await fillOrAssertNotEmpty(this.cityInput, city);
        await fillOrAssertNotEmpty(this.stateInput, state);
    }

    async selectPaymentMethod(method: PaymentMethod, details?: PaymentDetails) {
        await this.paymentMethodSelect.selectOption(method);

        switch (method) {
            case PaymentMethod.BANK_TRANSFER: {
                const { bank_name, account_name, account_number } = details as BankTransferDetails;
                await this.bankNameInput.fill(bank_name);
                await this.accountNameInput.fill(account_name);
                await this.accountNumberInput.fill(account_number);
                break;
            }
            case PaymentMethod.CREDIT_CARD: {
                const { credit_card_number, expiration_date, cvv, card_holder_name } = details as CreditCardDetails;
                await this.creditCardNumberInput.fill(credit_card_number);
                await this.expirationDateInput.fill(expiration_date);
                await this.cvvInput.fill(cvv);
                await this.cardHolderNameInput.fill(card_holder_name);
                break;
            }
            case PaymentMethod.BUY_NOW_PAY_LATER: {
                const { monthly_installments } = details as BuyNowPayLaterDetails;
                await this.monthlyInstallmentsSelect.selectOption(monthly_installments);
                break;
            }
            case PaymentMethod.GIFT_CARD: {
                const { gift_card_number, validation_code } = details as GiftCardDetails;
                await this.giftCardNumberInput.fill(gift_card_number);
                await this.validationCodeInput.fill(validation_code);
                break;
            }
            case PaymentMethod.CASH_ON_DELIVERY:
            default:
                break;
        }
    }

    async placeOrder() {
        await this.finishButton.click();
        await expect(this.successMessage).toBeVisible();
        while (await this.finishButton.isVisible()) {
            await this.finishButton.click();
            try {
                await expect(this.successMessage).toBeHidden();
            }
            catch (error) {
                // do nothing
            }
        }
    }
}
