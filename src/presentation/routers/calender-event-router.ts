import { timeStamp } from "console";
import express, { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
} from "../../config/environments";
import { addCalenderEvent } from "../../domain/use-cases/calender-event/add-event";
import { IAddCalenderEvent } from "../../domain/use-cases/interfaces/calender-event/add-event";
console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

const calenderEventRouter = (addCalenderEvent: IAddCalenderEvent) => {
    const router = express.Router();
    router.post(
        "/add-event",
        async (
            req: Request<
                {},
                {},
                {
                    code: string;
                    startTimestamp: number;
                    frequencyInDays: number;
                    rounds: number;
                    description: string;
                }
            >,
            res: Response,
            next: NextFunction
        ) => {
            const {
                code,
                startTimestamp,
                frequencyInDays,
                rounds,
                description,
            } = req.body;

            if (
                !startTimestamp ||
                !frequencyInDays ||
                !rounds ||
                !description
            ) {
                const err = {
                    message:
                        "code, startTimestamp, frequencyInDays, rounds, and description are required to create and add event to the calender",
                    status: 401,
                };
                return next(err);
            }

            const timestamps = new Array(rounds).fill(0);
            // timestamps.forEach((timeStamp: number, index: number) => {
            //     timestamps[index] = startTimestamp + 86400 * frequencyInDays;
            // });
            for (let i = 0; i < frequencyInDays; i++) {
                if (i === 0) {
                    timestamps[i] = startTimestamp;
                } else {
                    timestamps[i] =
                        startTimestamp + 86400 * (frequencyInDays * i);
                }
            }

            const events: any[] = new Array();

            timestamps.forEach((timeStamp: number, index: number) => {
                events[index] = {
                    colorId: "1",
                    summary: `Thrift round at chainedthrift - round ${index + 1
                        }`,
                    description: description,
                    location: "https://chainedthrift.com",
                    start: {
                        dateTime: new Date(timeStamp * 1000),
                    },
                    end: {
                        dateTime: new Date((timeStamp + 60 * 5) * 1000),
                    },
                };
            });

            // create the events here
            // const event = {
            //     summary: 'Thrift round at chainedthrift',
            //     description: description,
            //     location: "Niger Minna",
            //     start: {
            //         dateTime: new Date(1666202687000),
            //     },
            //     end: {
            //         dateTime: new Date(1666289087000),
            //     },
            // };

            const Oauth2Client = new google.auth.OAuth2(
                GOOGLE_CLIENT_ID,
                GOOGLE_CLIENT_SECRET,
                GOOGLE_REDIRECT_URI
            );

            const { tokens } = await Oauth2Client.getToken(code);

            Oauth2Client.setCredentials({ access_token: tokens.access_token });

            const added = await addCalenderEvent.execute(events, Oauth2Client);
            console.log("added", added)
            console.log("tokens", tokens)
            if (!added) {
                return res.status(500).json({
                    message: "somethings went wrong! cannot event",
                });
            }

            return res.status(200).json({ message: "success" });
        }
    );
    return router;
};

const calenderEventMiddleware = calenderEventRouter(addCalenderEvent);

export default calenderEventMiddleware;
