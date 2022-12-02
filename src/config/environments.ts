import dotenv from "dotenv";
dotenv.config({ path: ".env" });

/**
|----------------------------------------------------------------------------------------|
    App Configuration
|----------------------------------------------------------------------------------------|
*/
export const ENVIRONMENT = process.env.NODE_ENV;
const PROD = ENVIRONMENT === "production";
export const PORT = process.env.PORT;

/**
 *  Mongo DB
 */
export const MONGODB_URI = PROD
    ? process.env.MONGODB_PRODUCTION
    : process.env.MONGODB_DEVELOPMENT;

// google credentials
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
console.log(GOOGLE_CLIENT_ID)
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

export const JWT_SECRET = process.env.JWT_SECRET;
