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
