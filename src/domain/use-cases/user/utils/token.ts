const jwt = require("jsonwebtoken");
import { JWT_SECRET } from "../../../../config/environments";

export const generateToken = (userAddress: string): string => {
    return jwt.sign({ userAddress }, JWT_SECRET, { expiresIn: "7d" }) as string;
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};
