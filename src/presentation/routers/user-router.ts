import express, { NextFunction, Request, Response } from "express";
import { IUser } from "../../domain/entities/user";
import { ICheckUserUsecase } from "../../domain/use-cases/interfaces/user/check-user-existence";
import { ICreateUserUsecase } from "../../domain/use-cases/interfaces/user/create-user";
import { IGetUserUsecase } from "../../domain/use-cases/interfaces/user/get-user";

const userRouter = (
    createUser: ICreateUserUsecase,
    getUser: IGetUserUsecase,
    checkUser: ICheckUserUsecase
) => {
    const router = express.Router();
    // create a controller file and import them and use here to keep this file clean
    router.get(
        "/get-user",
        async (
            req: Request<{}, { signature: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const { signature } = req.body;
            if (!signature) {
                const err = { message: "signature is required", status: 401 };
                return next(err);
            }
            try {
                const user = await getUser.execute(signature);
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
                { signature: string; userData: Omit<IUser, "id"> }
            >,
            res: Response,
            next: NextFunction
        ) => {
            try {
                const { signature, userData } = req.body;
                if (!signature || !userData) {
                    const err = {
                        message: "signature and user data required",
                        status: 401,
                    };
                    return next(err);
                }
                const user = await createUser.execute(signature, userData);
                res.status(200).json(user);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
};

export default userRouter;
