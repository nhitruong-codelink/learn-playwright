import { test, expect } from '../../src/fixtures/test.fixture';
import { PaymentMethod } from '../../src/data/enum/payment.enum';
import { createCustomer } from '../../src/data/customer';


test.describe('Checkout flow', () => {
    let customerEmail: string;

    test.afterEach(async ({ db }) => {
        if (customerEmail) {
            await db.invoice.deleteOrderDataByEmail(customerEmail);
        }
    });

    test('checkout creates an order in the database', { tag: '@e2e' },
        async ({ pages, userAPI, db }) => {
            const customer = createCustomer();
            customerEmail = customer.email;

            // Create new customer via API
            await userAPI.registerCustomer(customer);

            // 1. Login
            await pages.home.goto();
            await pages.home.goToLogin();
            await pages.login.login(customer.email, customer.password);
            await expect(pages.myaccount.navMenu).toHaveText(`${customer.first_name} ${customer.last_name}`);
            await pages.login.goToHome();

            // 2. Find product
            const product = 'Hammer';
            await pages.home.search(product);
            await pages.home.openProduct(product);

            // 3. Add to cart
            await pages.product.addToCart();
            await expect(pages.product.addSuccessAlert).toBeVisible();


            // 4. Checkout
            await pages.product.goToCart();
            await pages.checkout.proceedToCheckout();
            await expect(pages.checkout.cartStep).toHaveClass('ng-star-inserted done navigable');

            // 5. Fill checkout
            await pages.checkout.proceedToCheckout();
            await expect(pages.checkout.signinStep).toHaveClass('ng-star-inserted done navigable');

            await pages.checkout.fillBillingAddress(customer.address.country, customer.address.postal_code, customer.address.house_numnber);
            await pages.checkout.proceedToCheckout();
            await expect(pages.checkout.billingStep).toHaveClass('ng-star-inserted done navigable');

            await pages.checkout.selectPaymentMethod(PaymentMethod.CASH_ON_DELIVERY);

            // 6. Complete order
            await pages.checkout.placeOrder();

            // 7. UI validation
            await expect(pages.checkout.orderConfirmMessage).toBeVisible();

            // 8. DB validation
            const order = await db.invoice.getLatestOrderByEmail(customer.email);

            expect(order).toBeDefined();

            expect(order.email).toBe(customer.email);

            expect(order.first_name).toBe(customer.first_name);

            expect(order.last_name).toBe(customer.last_name);

            expect(Number(order.total_amount)).toBeGreaterThan(0);
        });
});