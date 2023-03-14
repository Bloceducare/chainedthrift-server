import express from "express";
import cors from "cors";
// const corsOption = {
//     origin: '*',
//     credentials: true,
//     optionsSuccessStatus: 200
// };
const app = express();

// app.use(cors(
//     {
//         origin: 'https://chainedthrift.finance',
//         credentials: true,
//         methods: 'POST',
//         optionsSuccessStatus: 200,
//     }
// ));
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})
app.use(express.json());

export default app;
