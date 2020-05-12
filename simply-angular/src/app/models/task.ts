import { User } from "./user";

export class Task {
    title: string;
    creationDate: Date;
    modificationDate: Date; 
    owner: User;
    project: string;
    assignee:  User;
    descirption: string;
    comments: [];
    participants: User[] = [];
    priority: string;
    status: string;
}