import { IUser } from "../../../domain/entities/user";
import { IDataBaseWrapper } from "../../interfaces/data-sources/database-wrapper";
import { IUserDataSource } from "../../interfaces/data-sources/user-data-source";

export class MongoDBUserDataSource implements IUserDataSource {
    private db: IDataBaseWrapper;

    constructor(db: IDataBaseWrapper) {
        this.db = db;
    }

    async createUser(userData: IUser): Promise<IUser> {
        const result = await this.db.insertOne(userData);
        return result;
    }

    async getUser(query: object): Promise<IUser> {
        const result = await this.db.find(query);
        return result;
    }
}
