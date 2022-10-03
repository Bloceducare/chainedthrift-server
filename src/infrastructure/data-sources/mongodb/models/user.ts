import { Schema, model, models } from "mongoose";
import { IUser } from "../../../../domain/entities/user";

const userSchema = new Schema<IUser>({
    walletAddress: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        match: [/^0x[a-f0-9]{40}$/, "invalid wallet address"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "invalid email address"],
    },
    username: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        match: [
            /^(?=.{3,8}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "invalid username",
        ],
    },
});

export default model("User", userSchema);
