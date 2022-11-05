import { IUserRepository } from "../../interfaces/repositories/user-repository";
import { IUser } from "../../entities/user";
import { userRepositoryImpl } from "../../../infrastructure/repositories/user-repository";
import { verifyToken } from "./utils/token";
import { IGetUserWithTokenUsecase } from "../interfaces/user/get-user-with-token";

export class GetUserWithToken implements IGetUserWithTokenUsecase {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userToken: string): Promise<IUser> {
        try {
            const tokenData = verifyToken(userToken);
            if (!tokenData?.userAddress) {
                const err = {
                    message: "invalid token",
                    status: 401,
                };
                throw err;
            }
            const user = await this.userRepository.getUser({
                walletAddress: tokenData.userAddress.toLocaleLowerCase(),
            });
            if (!user) {
                const err = {
                    status: 404,
                    message: "User not found",
                };
                throw err;
            }

            return {
                id: user._id,
                walletAddress: user.walletAddress,
                email: user.email,
                username: user.username,
            };
        } catch (error: any) {
            if (
                ["TokenExpiredError", "JsonWebTokenError"].includes(error.name)
            ) {
                const err = {
                    status: 401,
                    message: error.message,
                };
                throw err;
            }
            throw error;
        }
    }
}

export const getUserWithToken = new GetUserWithToken(userRepositoryImpl);
