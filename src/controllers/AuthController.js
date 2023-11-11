import { User } from "../database";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    register,
};
