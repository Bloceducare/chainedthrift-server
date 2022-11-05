import { IGetUserUsecase } from "../interfaces/user/get-user";
import { IUserRepository } from "../../interfaces/repositories/user-repository";
import { IUser } from "../../entities/user";
import { verifySignature } from "./utils/verifySignature";
import { userRepositoryImpl } from "../../../infrastructure/repositories/user-repository";
import { generateToken } from "./utils/token";
export class GetUser implements IGetUserUsecase {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(
        signature: string,
        message: string,
        address: string
    ): Promise<IUser & { token: string }> {
        try {
            const isVerified = verifySignature({
                signature,
                message,
                signerAddress: address,
            });
            if (!isVerified) {
                const err = {
                    message: "Signature and signer do not match",
                    status: 401,
                };
                throw err;
            }
            const user = await this.userRepository.getUser({
                walletAddress: address.toLocaleLowerCase(),
            });
            if (!user) {
                const err = {
                    status: 404,
                    message: "User not found",
                };
                throw err;
            }
            const token = generateToken(user.walletAddress);

            return {
                id: user._id,
                walletAddress: user.walletAddress,
                email: user.email,
                username: user.username,
                token,
            };
        } catch (error) {
            throw error;
        }
    }
}

export const getUser = new GetUser(userRepositoryImpl);
