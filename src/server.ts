import express, { Express } from "express";
import authorRoutes from "./routes/authorRoutes";
import { logger } from "./middleware/logger";
import bookRoutes from "./routes/bookRoutes";
import bodyParser from "body-parser";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Allows the API to receive JSON data
app.use(express.json());
app.use(bodyParser.json())

// Logger middleware
app.use(logger);

// Author routes
app.use("/authors", authorRoutes);

// Book routes
app.use("/books", bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});