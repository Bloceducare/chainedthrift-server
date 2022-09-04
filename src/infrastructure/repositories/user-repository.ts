import { IUserDataSource } from "../interfaces/data-sources/user-data-source";
import { IUser } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/interfaces/repositories/user-repository";

export class UserRepositoryImpl implements IUserRepository {
    userDataSource: IUserDataSource;

    constructor(userDataSource: IUserDataSource) {
        this.userDataSource = userDataSource;
    }

    async getUser(query: object): Promise<IUser> {
        const result = await this.userDataSource.getUser(query);
        return result;
    }

    async createUser(userData: IUser): Promise<IUser> {
        const result = await this.userDataSource.createUser(userData);
        return result;
    }
}
