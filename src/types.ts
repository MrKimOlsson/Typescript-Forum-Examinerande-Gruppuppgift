export interface User {
	id: number;
	name: string;
	userName: string;
}

export type ThreadCategory = "THREAD" | "QNA" | "NEWS" | "SPORT" | "POLITICS" | "OTHER" | "GENERAL";

export interface Thread {
  	id: number;
	title: string;
	category: ThreadCategory;
	creationDate: string;
	description: string;
	creator: User;
}

export interface QNAThread extends Thread {
	category: "QNA";
	isAnswered: boolean;
	commentAnswerId?: number
}

export interface Comment {
	id: number; 
	thread: number;
	content: string;
	creator: User
}

<<<<<<< HEAD
export type CategoryProps = {
    category: ThreadCategory
  }
=======

>>>>>>> ea77c2bf3b0bd75db091843e0ae1b670f5a2f3d9
