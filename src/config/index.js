const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27018/ecom";
const port = process.env.PORT || 8080;
const httpStatus = {
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: "Internal server error",
    },
    BAD_REQUEST: {
        code: 400,
        message: "Bad request",
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
