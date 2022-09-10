import { IUserDataSource } from "../interfaces/data-sources/user-data-source";
import { IUser } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/interfaces/repositories/user-repository";
import { userDataSource } from "../data-sources/mongodb/mongodb-user-data-source";

export class UserRepositoryImpl implements IUserRepository {
    userDataSource: IUserDataSource;

    constructor(userDataSource: IUserDataSource) {
        this.userDataSource = userDataSource;
    }

    async getUser(query: object): Promise<any> {
        const result = await this.userDataSource.getUser(query);
        return result;
    }

    async createUser(userData: IUser): Promise<any> {
        const result = await this.userDataSource.createUser(userData);
        return result;
    }
}

export const userRepositoryImpl = new UserRepositoryImpl(userDataSource);
