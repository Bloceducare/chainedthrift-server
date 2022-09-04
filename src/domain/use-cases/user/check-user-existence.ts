import { ICheckUserUsecase } from "../interfaces/user/check-user-existence";
import { IUserRepository } from "../../interfaces/repositories/user-repository";
export class CheckUser implements ICheckUserUsecase {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(walletAddress: string): Promise<boolean> {
        try {
            const user = await this.userRepository.getUser({ walletAddress });
            return user ? true : false;
        } catch (error) {
            throw error;
        }
    }
}
