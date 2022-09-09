import { IUser } from "../../../domain/entities/user";
import { IDataBaseWrapper } from "../../interfaces/data-sources/database-wrapper";
import { IUserDataSource } from "../../interfaces/data-sources/user-data-source";
import { userDatabase } from "./database-wrappers/user-database-wrapper";

export class MongoDBUserDataSource implements IUserDataSource {
    private db: IDataBaseWrapper;

    constructor(db: IDataBaseWrapper) {
        this.db = db;
    }

    async createUser(userData: IUser): Promise<any> {
        try {
            const result = await this.db.insertOne(userData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUser(query: object): Promise<any> {
        try {
            const result = await this.db.find(query);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export const userDataSource = new MongoDBUserDataSource(userDatabase);
