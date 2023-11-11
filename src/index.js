import express from "express";
import { errorConverter, errorHandler } from "./middleware";
import config from "./config";
import { connectDB } from "./database";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);

app.listen(config.port, async () => {
    await connectDB();
    console.info(`Server listening on port ${config.port}`);
});

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(config.httpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message ?? config.httpStatus.INTERNAL_SERVER_ERROR.message,
    });
});
