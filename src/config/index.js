const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27018/ecom";
const port = process.env.PORT || 8080;
const httpStatus = {
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: "Internal server error",
    },
};

export default {
    MONGODB_URI,
    port,
    httpStatus,
};
