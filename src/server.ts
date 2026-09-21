import express, { Express } from "express";
import authorRoutes from "./routes/authorRoutes";
import { logger } from "./middleware/logger";
import bookRoutes from "./routes/bookRoutes";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// allows the API to receive JSON data
app.use(express.json());
app.use(bodyParser.json())

// logger middleware
app.use(logger);

// author routes
app.use("/authors", authorRoutes);

// book routes
app.use("/books", bookRoutes);

// error handling
app.use(errorHandler);

// nandle requests for routes that do not exist
app.use((req, res) => {
    res.status(404).json({message: "Route not found"});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});