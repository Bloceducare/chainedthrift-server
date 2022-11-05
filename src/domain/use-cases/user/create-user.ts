import {
    formatMongoDBDuplicateKeyError,
    formatMongoDBValidationError,
} from "../../../infrastructure/data-sources/mongodb/utils/errors";
import { userRepositoryImpl } from "../../../infrastructure/repositories/user-repository";
import { IUser } from "../../entities/user";
import { IUserRepository } from "../../interfaces/repositories/user-repository";
import { ICreateUserUsecase } from "../interfaces/user/create-user";
import { generateToken } from "./utils/token";
import { verifySignature } from "./utils/verifySignature";

export class CreateUser implements ICreateUserUsecase {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(
        signature: string,
        message: string,
        user: IUser
    ): Promise<IUser & { token: string }> {
        // verify the signature to retrieve the signaer's wallet address
        // compare the wallet address against the wallet address in the user object, if they tally, proceed to create the user, otherwise, throw an error
        try {
            const isVerified = verifySignature({
                signature,
                message,
                signerAddress: user.walletAddress,
            });

            if (!isVerified) {
                const err = {
                    message: "Signature and signer do not match",
                    status: 401,
                };
                throw err;
            }
            const result = await this.userRepository.createUser({
                ...user,
                walletAddress: user.walletAddress.toLowerCase(),
            });
            const token = generateToken(user.walletAddress);
            return {
                id: result._id,
                walletAddress: result.walletAddress,
                email: result.email,
                username: result.username,
                token,
            };
        } catch (error: any) {
            if (error.name === "ValidationError") {
                const err = formatMongoDBValidationError(error);
                throw err;
            } else if (error.code && error.code == 11000) {
                const err = formatMongoDBDuplicateKeyError(error);
                throw err;
            }
            throw error;
        }
    }
}

export const createUser = new CreateUser(userRepositoryImpl);
