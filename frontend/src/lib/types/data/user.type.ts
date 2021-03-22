export interface IUser {
  // Keys
  id: string;
  email: string;
  fname: string | null;
  lname: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  updatedAt: Date;
	role: 'RESIDENT' | 'WORKER' | 'GUEST' | 'USER' | 'ASSOCIATE' | 'ADMIN'
}

export interface Address {

}

export interface Geo {

}

export interface Company {

}