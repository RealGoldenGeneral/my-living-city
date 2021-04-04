export interface Rating {
	id: number;
	ideaId: number;
	authorId: string;
	rating: number;
	ratingExplanation?: string;
	createdAt: Date;
	updatedAt: Date;
}
