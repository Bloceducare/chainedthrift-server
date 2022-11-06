import { IUser } from "../../../entities/user";

export interface IGetUserWithTokenUsecase {
    execute(token: string): Promise<IUser>;
}
