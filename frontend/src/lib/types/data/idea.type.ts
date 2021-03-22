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
}