import { IUser } from "../../../entities/user";

export const createUser = {
    execute: async (signature: string, user: IUser): Promise<IUser> => {
        try {
            // .........
            return { ...user, id: "6310c2f459e35550c2df3e97" };
        } catch (error) {
            throw error;
        }
    },
};
