import { IUser } from "../../../entities/user";

export interface ICreateUserUsecase {
    execute(signature: string, message: string, user: IUser): Promise<IUser>;
}
