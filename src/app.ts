import express from "express";
import cors from "cors";
// const corsOption = {
//     origin: '*',
//     credentials: true,
//     optionsSuccessStatus: 200
// };
const app = express();

app.use(cors(
    {
        origin: 'https://chainedthrift.finance',
        credentials: true,
        methods: 'POST',
        optionsSuccessStatus: 200,
    }
));
app.use(express.json());

export default app;
