

export type AdvertisementType = 'BASIC' | 'EXTRA';

export type PublishedType = 'false' | 'true';

export interface IBasicAdvertisement {
	id: number;
	ownerId: string;
	adTitle: string;
    adType: AdvertisementType;
    duration: number;
    adPosition: string;
    externalLink: string;
    published: PublishedType;
    adImage: any;
	createdAt: string;
	updatedAt: string;
}