import express from "express";
import cors from "cors";
const corsOption = {
    origin: 'https://chainedthrift.finance',
    credentials: true,
    optionsSuccessStatus: 200
};
const app = express();
app.use(cors(
    corsOption
));
app.use(express.json());

export default app;
