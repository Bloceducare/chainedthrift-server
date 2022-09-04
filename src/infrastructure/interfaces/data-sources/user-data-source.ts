import { IUser } from "../../../domain/entities/user";

export interface IUserDataSource {
    createUser(userData: IUser): Promise<IUser>;
    getUser(query: object): Promise<IUser>;
}
