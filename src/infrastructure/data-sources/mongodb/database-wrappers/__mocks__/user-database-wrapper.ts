import { IDataBaseWrapper } from "../../../../interfaces/data-sources/database-wrapper";

export const userDatabase: IDataBaseWrapper = {
    find: (query) => {
        return {
            _id: "6310c2f459e35550c2df3e97",
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
            __v: 0,
        };
    },
    insertOne: (data) => {
        return {
            _id: "6310c2f459e35550c2df3e97",
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
            __v: 0,
        };
    },
};
