import { IUser } from "../../../entities/user";

export const createUser = {
    execute: async (
        signature: string,
        message: string,
        user: IUser
    ): Promise<IUser & { token: string }> => {
        try {
            // .........
            return { ...user, id: "6310c2f459e35550c2df3e97", token: "token" };
        } catch (error) {
            throw error;
        }
    },
};
