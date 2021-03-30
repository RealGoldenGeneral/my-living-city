export interface RegisterInput {
  userRoleId?: number;
  email: string;
  password: string;
  confirmPassword: string;
  fname?: string;
  lname?: string;
  address?: AddressInput;
  geo?: GeoInput;
}

export interface AddressInput {
  streetAddress?: string;
  streetAddress2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface GeoInput {
  lon?: number;
  lat?: number;
}