import { IAddressInput } from "./address.input";
import { IGeoInput } from "./geo.input";

export interface IRegisterInput {
  userRoleId?: number;
  email: string;
  password: string;
  confirmPassword: string;
  fname?: string;
  lname?: string;
  address?: IAddressInput;
  geo?: IGeoInput;
  homeSegmentId?: number;
  workSegmentId?: number;
  schoolSegmentId?: number;
  homeSubSegmentId?: number;
  workSubSegmentId?: number;
  schoolSubSegmentId?: number;
}
export interface IUserRegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  homeSegmentId?: number;
  workSegmentId?: number;
  schoolSegmentId?: number;
  homeSubSegmentId?: number;
  workSubSegmentId?: number;
  schoolSubSegmentId?: number;
}

export interface IUserSegmentRegister {
  homeSegmentId?: number;
  workSegmentId?: number;
  schoolSegmentId?: number;
  homeSubSegmentId?: number;
  workSubSegmentId?: number;
  schoolSubSegmentId?: number;
}

export interface IUserSegmentRequest {
  userId: string;
  country: string;
  province: string;
  segmentName: string;
  subSegmentName: string;
}