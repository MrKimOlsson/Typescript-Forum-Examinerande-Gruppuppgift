declare interface QNAThread extends Thread {
	category: "qna";
	isAnswered: boolean;
	commentAnswerId?: number
}