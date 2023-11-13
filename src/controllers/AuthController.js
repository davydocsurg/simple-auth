import config from "../config";
import { User } from "../database";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        const token = user.generateAuthToken();
        const status = config.httpStatus.CREATED.code;

        return res.json({ status, user, token });
    } catch (error) {
        return res.json({
            status: config.httpStatus.INTERNAL_SERVER_ERROR.code,
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.json({
                status: config.httpStatus.BAD_REQUEST.code,
                message: config.httpStatus.BAD_REQUEST.message,
            });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.json({
                status: config.httpStatus.BAD_REQUEST.code,
                message: config.httpStatus.BAD_REQUEST.message,
            });

        const token = user.generateAuthToken();
        const status = config.httpStatus.OK.code;

        return res.json({ status, user, token });
    } catch (error) {
        return res.json({
            status: config.httpStatus.INTERNAL_SERVER_ERROR.code,
            message: error.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        return res.json({
            status: config.httpStatus.OK.code,
            message: "Logout",
        });
    } catch (error) {
        return res.json({
            status: config.httpStatus.INTERNAL_SERVER_ERROR.code,
            message: error.message,
        });
    }
};

export default {
    register,
    login,
    logout,
};
