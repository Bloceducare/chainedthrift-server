import { IUser } from "../../../entities/user";

export interface ICreateUserUsecase {
    execute(signature: string, user: IUser): Promise<IUser>;
}
