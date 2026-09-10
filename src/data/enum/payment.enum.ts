export enum PaymentMethod {
    BANK_TRANSFER = 'bank-transfer',
    CASH_ON_DELIVERY = 'cash-on-delivery',
    CREDIT_CARD = 'credit-card',
    BUY_NOW_PAY_LATER = 'buy-now-pay-later',
    GIFT_CARD = 'gift-card',
}

export interface BankTransferDetails {
    bank_name: string;
    account_name: string;
    account_number: string;
}

export interface CreditCardDetails {
    credit_card_number: string;
    expiration_date: string;
    cvv: string;
    card_holder_name: string;
}

export interface BuyNowPayLaterDetails {
    monthly_installments: '3' | '6' | '9' | '12';
}

export interface GiftCardDetails {
    gift_card_number: string;
    validation_code: string;
}

export type PaymentDetails =
    | BankTransferDetails
    | CreditCardDetails
    | BuyNowPayLaterDetails
    | GiftCardDetails;
