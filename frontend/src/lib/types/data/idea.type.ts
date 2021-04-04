import { Address } from "node:cluster";
import { Category } from "./category.type";
import { Geo } from "./geo.type";
import { Proposal } from "./proposal.type";
import { Project } from "./project.type";
import { Rating } from "./rating.type";
import { Comment } from "./comment.type";

export interface IIdea {
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
	state: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;

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