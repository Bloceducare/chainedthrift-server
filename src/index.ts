import app from "./app";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./config/environments";
import userMiddleware from "./presentation/routers/user-router";

(async () => {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log("database connection successful");

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
