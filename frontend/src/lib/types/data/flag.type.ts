import { BooleanLiteral } from "typescript";

export interface IFlag {
	id: number;
	ideaId: number;
	flaggerId: string;
    falseFlag: boolean;
}
export interface ICommentFlag {
	id: number;
	commentId: number;
	flaggerId: string;
	falseFlag: boolean;
}