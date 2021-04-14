export interface CommentLikeAndDislikeAggregation {
  likes: number;
  dislikes: number;
}

export interface ParsedCommentAuthor {
  id: string;
  email: string;
  fname: string;
  lname: string;
  address: {
    streetAddress: string;
    postalCode: string;
  }
}

export interface CommentLikeDislike {
  id: number;
  ideaCommentId: number;
  authorId: string;
}

export interface Comment {
  id:        number;
  ideaId:    number;
  authorId:  string;
  content:   string;
  active:    boolean;
  createdAt: string;
  updatedAt: string;
  author: ParsedCommentAuthor;
  likes: CommentLikeDislike[];
  dislikes: CommentLikeDislike[];
  _count: CommentLikeAndDislikeAggregation;
}
