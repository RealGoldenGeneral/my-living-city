

export type AdvertisementType = 'BASIC' | 'EXTRA';


export interface IBasicAdvertisement {
	id: number;
	ownerId: string;
	adTitle: string;
    adType: AdvertisementType;
    duration: number;
    adPosition: string;
    externalLink: string;
    published: boolean;
    adImage: any;
	createdAt: string;
	updatedAt: string;
}