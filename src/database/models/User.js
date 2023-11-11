import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, name: this.name, email: this.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expiration }
    );
    return token;
};

const User = mongoose.model("User", userSchema);

export default User;
