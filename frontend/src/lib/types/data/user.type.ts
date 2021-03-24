import { Address } from 'node:cluster';
import { Geo } from './geo.type';
import { UserRole } from './userRole.type';

export interface IUser {
	id: string;
	userRoleId?: number;
	userType: 'USER' | 'ADMIN' | 'DEVELOPER';
	email: string;
	password: string;
	fname?: string;
	lname?: string;
	createdAt: Date;
	updatedAt: Date;

	// Relationships can be nullable
	geo?: Geo;
	address?: Address;
	userRole?: UserRole;
}
