import express from "express";
// import { errorHandler } from "./middleware";
import config from "./config";
import { connectDB } from "./database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(errorHandler);

app.listen(config.port, async () => {
    await connectDB();
    console.info(`Server listening on port ${config.port}`);
});
