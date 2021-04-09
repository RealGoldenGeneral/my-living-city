export interface ParsedCommentAuthor {
  email: string;
  fname: string;
  lname: string;
}

export interface Comment {
  id:        number;
  ideaId:    number;
  authorId:  string;
  content:   string;
  active:    boolean;
  createdAt: Date;
  updatedAt: Date;

  author: ParsedCommentAuthor;
}
