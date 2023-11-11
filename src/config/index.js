const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27018/simple-auth";
const port = process.env.PORT || 8080;
const httpStatus = {
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: "Internal server error",
    },
    BAD_REQUEST: {
        code: 400,
        message: "Invalid credentials",
    },
    CREATED: {
        code: 201,
        message: "Created",
    },
    NOT_FOUND: {
        code: 404,
        message: "Not found",
    },
    OK: {
        code: 200,
        message: "OK",
    },
};
const jwt = {
    secret: process.env.JWT_SECRET || "secret",
    expiration: process.env.JWT_EXPIRATION || "1h",
};

export default {
    MONGODB_URI,
    port,
    httpStatus,
    jwt,
};
