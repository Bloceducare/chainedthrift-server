import app from "./app";
import { NextFunction, Request, Response } from "express";
import userRouter from "./presentation/routers/user-router";
import { GetUser } from "./domain/use-cases/user/get-user";
import { CreateUser } from "./domain/use-cases/user/create-user";
import { UserRepositoryImpl } from "./infrastructure/repositories/user-repository";
import mongoose from "mongoose";
import { IDataBaseWrapper } from "./infrastructure/interfaces/data-sources/database-wrapper";
import { MongoDBUserDataSource } from "./infrastructure/data-sources/mongodb/mongodb-user-data-source";
import { MONGODB_URI, PORT } from "./config/environments";
import User from "./infrastructure/data-sources/mongodb/models/user";
import { CheckUser } from "./domain/use-cases/user/check-user-existence";
import { hexZeroPad } from "ethers/lib/utils";

(async () => {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log("db connection successful");
        // const db = mongoose.connection.db;
        const userDatabase: IDataBaseWrapper = {
            find: (query) => User.findOne(query),
            insertOne: (data) => new User(data).save(),
        };

        const userDataSource = new MongoDBUserDataSource(userDatabase);
        const userRepositoryImpl = new UserRepositoryImpl(userDataSource);
        const createUser = new CreateUser(userRepositoryImpl);
        const getUser = new GetUser(userRepositoryImpl);
        const checkUser = new CheckUser(userRepositoryImpl);

        const userMiddleware = userRouter(createUser, getUser, checkUser);

        // user routes
        app.use("/api/user", userMiddleware);

        // when a request reaches here, its because the route is not found
        app.use((req, res, next) => {
            const err = {
                message: "Not Found",
                status: 404,
            };
            next(err);
        });

        app.use(
            (
                error: { status: number; message: string },
                req: Request,
                res: Response,
                next: NextFunction
            ) => {
                res.status(error.status || 500).json({
                    error: {
                        status: error.status || 500,
                        message: error.message || "an unknown error occured",
                    },
                });
            }
        );
        app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
    } catch (error) {}
})();
