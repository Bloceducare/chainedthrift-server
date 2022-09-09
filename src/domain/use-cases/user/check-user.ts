import { ICheckUserUsecase } from "../interfaces/user/check-user-existence";
import { IUserRepository } from "../../interfaces/repositories/user-repository";
import { userRepositoryImpl } from "../../../infrastructure/repositories/user-repository";
export class CheckUser implements ICheckUserUsecase {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(walletAddress: string): Promise<{ exist: boolean }> {
        try {
            const match = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
            if (!match) {
                const err = {
                    message: "invalid wallet address",
                };
                throw err;
            }
            const user = await this.userRepository.getUser({ walletAddress });
            return user ? { exist: true } : { exist: false };
        } catch (error) {
            throw error;
        }
    }
}

export const checkUser = new CheckUser(userRepositoryImpl);
