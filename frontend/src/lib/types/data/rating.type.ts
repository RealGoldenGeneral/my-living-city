export interface Rating {
	id: number;
	ideaId: number;
	authorId: string;
	rating: number;
	ratingExplanation?: string;
	createdAt: string;
	updatedAt: string;
}

export interface RatingValueBreakdown {
	strongDisagree: number;
	slightDisagree: number;
	neutral: number;
	slightAgree: number;
	strongAgree: number;
}

// export interface RatingValueBreakdown {
// 	[ratingValue: string]: number;
// }

export interface RatingAggregateSummary {
	ratingAvg: number;
	ratingCount: number;
	posRatings: number;
	negRatings: number;
	ratingValueBreakdown: RatingValueBreakdown;
}
export interface RatingAggregateResponse {
	ratings: Rating[];
	summary: RatingAggregateSummary;
}
