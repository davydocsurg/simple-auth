import config from "../src/config";
import AuthController from "../src/controllers/AuthController";
import { User } from "../src/database";

describe("register", () => {
    // Successfully create a new user with valid name, email, and password
    it("should create a new user when valid name, email, and password are provided", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "johndoe@example.com",
                password: "password123",
            },
        };
        const res = {
            json: jest.fn(),
        };
        const user = {
            generateAuthToken: jest.fn().mockReturnValue("token"),
        };
        const createSpy = jest.spyOn(User, "create").mockResolvedValue(user);
        const status = config.httpStatus.CREATED.code;

        await AuthController.register(req, res);

        expect(createSpy).toHaveBeenCalledWith({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
        });
        expect(user.generateAuthToken).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ status, user, token: "token" });
    });

    // Return a JSON response with status code 201, user object, and token
    it("should return a JSON response with status code 201, user object, and token", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "johndoe@example.com",
                password: "password123",
            },
        };
        const res = {
            json: jest.fn(),
        };
        const user = {
            generateAuthToken: jest.fn().mockReturnValue("token"),
        };
        jest.spyOn(User, "create").mockResolvedValue(user);
        const status = config.httpStatus.CREATED.code;

        await AuthController.register(req, res);

        expect(res.json).toHaveBeenCalledWith({ status, user, token: "token" });
    });

    // Returns a JSON response with status code 500 and error message if email is not unique
    it("should return a JSON response with status code 500 and error message if email is not unique", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "johndoe@example.com",
                password: "password123",
            },
        };
        const res = {
            json: jest.fn(),
        };
        User.create.mockRejectedValue({ code: 11000 });

        await AuthController.register(req, res);

        console.log(res.json.mock.calls[0][0]);

        expect(res.json).toHaveBeenCalledWith({
            status: config.httpStatus.INTERNAL_SERVER_ERROR.code,
            message: expect.any(String),
        });
    });
});
