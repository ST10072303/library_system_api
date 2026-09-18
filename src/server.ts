import express, { Express } from "express";
import { Author } from "./models/author";
import { logger } from "./middleware/logger";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// allows the API to receive JSON data
app.use(express.json());
// Logger middleware
app.use(logger);

// in-memory array of authors
const authors: Author[] = [
    {
        id: 1,
        name: "John Doe",
        email: "jdoe@example.com"
    },
    {
        id: 2,
        name: "John Cena",
        email: "jcena@example.com"
    }
];

// GET /authors
// returns all authors
app.get("/authors", (req, res) => {
    res.status(200).json(authors);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

