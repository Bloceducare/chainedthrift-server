import { IUser } from "../../../domain/entities/user";

export const userRepositoryImpl = {
    async getUser(query: object): Promise<any> {
        return {
            _id: "6310c2f459e35550c2df3e97",
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
            __v: 0,
        };
    },

    async createUser(userData: IUser): Promise<any> {
        return {
            _id: "6310c2f459e35550c2df3e97",
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
            __v: 0,
        };
    },
};
