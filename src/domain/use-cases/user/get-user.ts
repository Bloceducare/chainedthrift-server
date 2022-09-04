import { IGetUserUsecase } from "../interfaces/user/get-user";
import { IUserRepository } from "../../interfaces/repositories/user-repository";
import { IUser } from "../../entities/user";
import { getSignatureSigner } from "./utils/verifySignature";
import { signin_messsage } from "../../../constants/signature-messages";
export class GetUser implements IGetUserUsecase {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(signature: string): Promise<IUser> {
        try {
            const signer = getSignatureSigner({
                message: signin_messsage,
                signature,
            });
            const user = await this.userRepository.getUser({
                walletAddress: signer,
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
}
