import { AdvertisementType } from "../data/advertisement.type";
import { PublishedType } from "../data/advertisement.type";

export interface CreateAdvertisementInput {
	adTitle: string;
    adType: AdvertisementType;
    duration: number;
    adPosition: string;
    adImage: any;
    externalLink: string;
    published: PublishedType;
}