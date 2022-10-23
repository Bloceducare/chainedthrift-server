const jwt = require("jsonwebtoken");
import { JWT_SECRET } from "../../../../config/environments";

export const generateToken = (userAddress: string) => {
    return jwt.sign(userAddress, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err || !decoded) {
            const error = {
                message: "Invalid toke",
            };
            throw error;
        }
        return decoded;
    });
};
