import { test, expect } from '../../src/fixtures/test.fixture';
import { createContactMessage } from '../../src/data/contact';


test.describe('Contact form file upload', () => {
    test('shows an error when the attachment is not empty', async ({ pages }) => {
        const contactMessage = createContactMessage();
        const fileName = 'sample-attachment.txt';

        await pages.home.goto();
        await pages.contact.goToContact();
        await pages.contact.sendMessage(contactMessage, fileName);

        await expect(pages.contact.attachmentError).toBeVisible();
        await expect(pages.contact.attachmentError).toHaveText('File should be empty.');
    });
});
