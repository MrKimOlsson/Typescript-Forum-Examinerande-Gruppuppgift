export interface Thread {
    id: string;
  title: string;
  category: ThreadCategory;
  creationDate: string;
  description: string;
  creator: User;
}