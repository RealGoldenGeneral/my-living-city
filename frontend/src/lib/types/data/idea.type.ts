import { Address } from "node:cluster";
import { Category } from "./category.type";
import { Geo } from "./geo.type";
import { Proposal } from "./proposal.type";
import { Project } from "./project.type";
import { Rating } from "./rating.type";

export interface IIdea {
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