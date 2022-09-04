import { account_creation_messsage } from "../../../constants/signature-messages";
import { IUser } from "../../entities/user";
import { IUserRepository } from "../../interfaces/repositories/user-repository";
import { ICreateUserUsecase } from "../interfaces/user/create-user";
import { verifySignature } from "./utils/verifySignature";

export class CreateUser implements ICreateUserUsecase {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(signature: string, user: IUser): Promise<IUser> {
        // verify the signature to retrieve the signaer's wallet address
        // compare the wallet address against the wallet address in the user object, if they tally, proceed to create the user, otherwise, throw an error
        try {
            const isVerified = verifySignature({
                signature,
                message: account_creation_messsage,
                signerAddress: user.walletAddress,
            });

            if (!isVerified) {
                const err = {
                    message: "Signature and signer do not match",
                    status: 401,
                };
                throw err;
            }
            const result = await this.userRepository.createUser(user);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
