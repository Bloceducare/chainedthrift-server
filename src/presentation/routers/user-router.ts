import express, { NextFunction, Request, Response } from "express";
import { IUser } from "../../domain/entities/user";
import { ICheckUserUsecase } from "../../domain/use-cases/interfaces/user/check-user-existence";
import { ICreateUserUsecase } from "../../domain/use-cases/interfaces/user/create-user";
import { IGetUserUsecase } from "../../domain/use-cases/interfaces/user/get-user";
import { checkUser } from "../../domain/use-cases/user/check-user";
import { createUser } from "../../domain/use-cases/user/create-user";
import { getUser } from "../../domain/use-cases/user/get-user";

const userRouter = (
    createUser: ICreateUserUsecase,
    getUser: IGetUserUsecase,
    checkUser: ICheckUserUsecase
) => {
    const router = express.Router();
    // create a controller file and import them and use here to keep this file clean
    router.post(
        "/get-user",
        async (
            req: Request<
                {},
                {},
                { signature: string; message: string; address: string }
            >,
            res: Response,
            next: NextFunction
        ) => {
            const { signature, message, address } = req.body;
            if (!signature || !message || !address) {
                const err = {
                    message:
                        "signature, message and signer address are required",
                    status: 401,
                };
                return next(err);
            }
            try {
                const user = await getUser.execute(signature, message, address);
                res.status(200).json(user);
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        "/check",
        async (
            req: Request<{ walletAddress: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const walletAddress = req.query.walletAddress as string;

            if (!walletAddress) {
                const err = {
                    message: "wallet address is required",
                    status: 401,
                };
                return next(err);
            }
            try {
                const result = await checkUser.execute(walletAddress);
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        }
    );

    router.post(
        "/create-user",
        async (
            req: Request<
                {},
                {},
                {
                    signature: string;
                    message: string;
                    userData: Omit<IUser, "id">;
                }
            >,
            res: Response,
            next: NextFunction
        ) => {
            try {
                const { signature, message, userData } = req.body;

                if (!signature || !message || !userData) {
                    const err = {
                        message: "signature, message and user data required!",
                        status: 401,
                    };
                    return next(err);
                }
                const user = await createUser.execute(
                    signature,
                    message,
                    userData
                );
                res.status(200).json(user);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
};

const userMiddleware = userRouter(createUser, getUser, checkUser);

export default userMiddleware;
