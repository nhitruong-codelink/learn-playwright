import { ProductResponse } from '../product';

export function createMockProductsResponse(): ProductResponse {
    return {
        current_page: 1,
        data: [
            {
                id: 'mock-01M1ZP4HBQFTCSTE8JKNATBXET',
                name: 'Mocked Automation Hammer',
                description: 'A product returned entirely from a mocked network response.',
                price: 19.99,
                is_location_offer: false,
                is_rental: false,
                co2_rating: 'A',
                in_stock: true,
                is_eco_friendly: true,
                product_image: {
                    id: 'mock-image-01',
                    by_name: 'Mock Author',
                    by_url: 'https://example.com',
                    source_name: 'Mock Source',
                    source_url: 'https://example.com',
                    file_name: 'hammer01.avif',
                    title: 'Mocked Automation Hammer',
                },
                category: {
                    name: 'Hand Tools',
                },
            },
        ],
        from: 1,
        last_page: 1,
        per_page: 9,
        to: 1,
        total: 1,
    };
}
