import { IUser } from "../../../../domain/entities/user";

export const userDataSource = {
    createUser: async (userData: IUser) => {
        return {
            _id: "6310c2f459e35550c2df3e97",
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
            __v: 0,
        };
    },
    getUser: async (query: object) => {
        return {
            _id: "6310c2f459e35550c2df3e97",
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
            __v: 0,
        };
    },
};
