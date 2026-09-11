import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page.page';
import { type ContactMessage } from '../data/contact';
import path from 'path';
import { envConfig } from '../config/env.config';


export class ContactPage extends BasePage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectSelect: Locator;
    readonly messageInput: Locator;
    readonly attachmentInput: Locator;
    readonly submitButton: Locator;
    readonly successAlert: Locator;
    readonly attachmentError: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = page.locator('[data-test="first-name"]');
        this.lastNameInput = page.locator('[data-test="last-name"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.subjectSelect = page.locator('[data-test="subject"]');
        this.messageInput = page.locator('[data-test="message"]');
        this.attachmentInput = page.locator('[data-test="attachment"]');
        this.submitButton = page.locator('[data-test="contact-submit"]');
        this.successAlert = page.locator('.alert-success');
        this.attachmentError = page.locator('[data-test="attachment-error"]');
    }

    async fill(contactMessage: ContactMessage) {
        await this.firstNameInput.fill(contactMessage.first_name);
        await this.lastNameInput.fill(contactMessage.last_name);
        await this.emailInput.fill(contactMessage.email);
        await this.subjectSelect.selectOption(contactMessage.subject);
        await this.messageInput.fill(contactMessage.message);
    }

    async uploadAttachment(filePath: string) {
        await this.attachmentInput.setInputFiles(filePath);
    }

    async submit() {
        await this.submitButton.click();
    }

    async sendMessage(contactMessage: ContactMessage, fileName?: string) {
        await this.fill(contactMessage);

        if (fileName) {
            const attachmentPath = path.join(envConfig.testFilesPath, fileName);
            await this.uploadAttachment(attachmentPath);
        }

        await this.submit();
    }
}
