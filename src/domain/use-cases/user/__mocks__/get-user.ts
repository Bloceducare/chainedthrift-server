import { IUser } from "../../../entities/user";

export const getUser = {
    execute: async (
        signature: string,
        message: string,
        address: string
    ): Promise<IUser & { token: string }> => {
        try {
            return {
                id: "6310c2f459e35550c2df3e97",
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                email: "test123@gmail.com",
                username: "testuser",
                token: "token",
            };
        } catch (error) {
            throw error;
        }
    },
};
