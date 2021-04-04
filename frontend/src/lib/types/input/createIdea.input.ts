import { AddressInput } from "./address.input";
import { GeoInput } from "./geo.input";

export interface CreateIdeaInput {
	categoryId: number;
	title: string;
	description: string;
	communityImpact?: string;
	natureImpact?: string;
	artsImpact?: string;
	energyImpact?: string;
	manufacturingImpact?: string;
  address?: AddressInput;
  geo?: GeoInput;
}