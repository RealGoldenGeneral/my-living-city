export interface IdeaInterface {
	id: number;
	authorId: string;
	categoryId: number;
	title: String;
	description: String;
	communityImpact?: String;
	natureImpact?: String;
	artsImpact?: String;
	energyImpact?: String;
	manufacturingImpact?: String;
	state: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}

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