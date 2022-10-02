import { IUser } from "../../../entities/user";

export interface IGetUserUsecase {
    execute(signature: string, message: string): Promise<IUser>;
}
