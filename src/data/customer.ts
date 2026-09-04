export interface Address {
  house_numnber: string;
  street?: string;
  city?: string;
  state?: string;
  country: string;
  postal_code: string;
}

export interface User {
  first_name: string;
  last_name: string;
  dob: string; // Format: YYYY-MM-DD
  phone: string;
  email: string;
  password: string;
  address: Address;
}

export const customer: User = {
  first_name: 'Sam',
  last_name: 'Sum',
  dob: '2000-11-20',
  phone: '5550199',
  email: `sam.sum.${Date.now()}@example.com`, // Keep this dynamic to avoid duplicate email errors
  password: 'Hope@This@Password@Works@123',
  address: {
    house_numnber: '42',
    street: 'Rempel Avenue',
    city: 'South Newell',
    state: 'Florida',
    country: 'United States of America (the)',
    postal_code: '90210'
  }
} 