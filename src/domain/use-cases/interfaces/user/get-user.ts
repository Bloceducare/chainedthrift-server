import { IUser } from "../../../entities/user";

export interface IGetUserUsecase {
    execute(
        signature: string,
        message: string,
        address: string
    ): Promise<IUser & { token: string }>;
}
