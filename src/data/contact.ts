export interface ContactMessage {
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    message: string;
}

export function createContactMessage(overrides: Partial<ContactMessage> = {}): ContactMessage {
    return {
        first_name: 'Sam',
        last_name: 'Sum',
        email: `sam.sum.${Date.now()}@example.com`,
        subject: 'customer-service',
        message: 'This is an automated test message sent from a Playwright test.',
        ...overrides,
    };
}
