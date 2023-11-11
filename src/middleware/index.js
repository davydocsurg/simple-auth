import config from "../config";

export const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === "production" && !err.isOperational) {
        statusCode = config.httpStatus.INTERNAL_SERVER_ERROR.code;
        message = config.httpStatus.INTERNAL_SERVER_ERROR.message;
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
    };

    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }

    res.status(statusCode).json(response);
    next();
};
