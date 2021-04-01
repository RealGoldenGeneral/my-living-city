import { AddressInput } from "./address.input";
import { GeoInput } from "./geo.input";

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