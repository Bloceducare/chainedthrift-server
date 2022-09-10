import { IUser } from "../../../entities/user";

export const getUser = {
    execute: async (signature: string): Promise<IUser> => {
        try {
            return {
                id: "6310c2f459e35550c2df3e97",
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                email: "test123@gmail.com",
                username: "testuser",
            };
        } catch (error) {
            throw error;
        }
    },
};
