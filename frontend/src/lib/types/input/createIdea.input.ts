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
  superSegmentId?: number;
  imagePath?: any;
  supportingProposalId?: number;
  active?: boolean
  state?: string;
  needCollaborators?: boolean;
  needVolunteers?: boolean;
  needDonations?: boolean;
  needSuggestions?: boolean;
  needFeedback?: boolean;
  location?: string;
  // feedback: {1:string, 2:string, 3:string, 4:string, 5:string};
}
