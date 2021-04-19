import { Category } from "./category.type";
import { Address } from './address.type'
import { Geo } from "./geo.type";
import { Proposal } from "./proposal.type";
import { Project } from "./project.type";
import { Rating } from "./rating.type";
import { Comment } from "./comment.type";
import { IUser } from "./user.type";

export type IdeaState = 'IDEA' | 'PROPOSAL' | 'PROJECT';

export interface IBasicIdea {
	id: number;
	authorId: string;
	categoryId: number;
	title: string;
	description: string;
	communityImpact?: string;
	natureImpact?: string;
	artsImpact?: string;
	energyImpact?: string;
	manufacturingImpact?: string;
	state: IdeaState;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface IIdeaWithBasicUser extends IBasicIdea {
	geo?: Geo,
	address?: Address,
	category?: Category
	author?: IUser;
}
export interface IIdea extends IBasicIdea{
	// Relationships can be nullable 
	geo?: Geo;
	address?: Address;
	category?: Category;

	// Extended Relationships
	comments?: Comment[];
	ratings?: Rating[];
	proposalInfo?: Proposal;
	projectInfo?: Project;
}

export interface IdeaBreakdown {
	id: number;
	authorId: string;
	categoryId: number;
	title: string;
	description: string;
	state: IdeaState;
	active: boolean;
	createdAt: string;
	updatedAt: string;

	// Aggregate breakdown
	engagements: number;
	ratingAvg: number;
	commentCount: number;
	ratingCount: number;
	posRatings: number;
	negRatings: number;
}