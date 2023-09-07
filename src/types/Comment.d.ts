declare interface Comment {
	id: number; 
	thread: number;
	content: string;
	creator: User;
	createdAt: string;
}