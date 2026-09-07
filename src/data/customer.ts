interface Address {
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