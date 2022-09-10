import { IDataBaseWrapper } from "../../../interfaces/data-sources/database-wrapper";
import user from "../models/user";

export const userDatabase: IDataBaseWrapper = {
    find: (query) => user.findOne(query),
    insertOne: (data) => new user(data).save(),
};
