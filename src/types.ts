export interface User {
	id: number;
	name: string;
	userName: string;
}

export type ThreadCategory = "" | "qna" | "news" | "sports" | "politics" | "other" | "general";

export type QnaCategory = "qna";

export interface Thread {
  	id: number;
	title: string;
	category: ThreadCategory;
	creationDate: string;
	description: string;
	creator: User;
}

export interface QNAThread extends Thread {
	category: "qna";
	isAnswered: boolean;
	commentAnswerId?: number
}

export interface Comment {
	id: number; 
	thread: number;
	content: string;
	creator: User;
	createdAt: string;
}

export type CategoryProps = {
    category: ThreadCategory
  }


