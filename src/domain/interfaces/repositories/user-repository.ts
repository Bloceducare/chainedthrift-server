import { IUser } from "../../entities/user";

export interface IUserRepository {
    createUser(userData: IUser): Promise<any>;
    getUser(query: object): Promise<any>;
}
