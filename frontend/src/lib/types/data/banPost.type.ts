import { IIdea } from "./idea.type"

export interface IBanPost {
    id: number,
    banMessage?: string,
    bannedBy: string,
    createdAt: Date,

    // Relationships
    postId: number,
    authorId: string

    // Optional
    notificationDismissed?: boolean
    post?: IIdea;
}