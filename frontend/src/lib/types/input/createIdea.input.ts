import { IAddressInput } from "./address.input";
import { IGeoInput } from "./geo.input";

export interface ICreateIdeaInput {
	categoryId: number;
	userType: string;
	title: string;
	description: string;
	communityImpact?: string;
	natureImpact?: string;
	artsImpact?: string;
	energyImpact?: string;
	manufacturingImpact?: string;
  	address?: IAddressInput;
  	geo?: IGeoInput;
	segmentId?: number;
	subSegmentId?: number;
	imagePath?: any;
}