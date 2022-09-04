import { IUser } from "../../entities/user";

export interface IUserRepository {
    createUser(userData: IUser): Promise<IUser>;
    getUser(query: object): Promise<IUser>;
}
