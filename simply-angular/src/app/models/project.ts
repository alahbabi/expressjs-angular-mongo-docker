import { User } from "./user";

export class Project {
    name: string;
    creationDate: Date;
    owner: User;
    collaborators: User[] = [];
}