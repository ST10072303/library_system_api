import { Router } from "express";
import { Author } from "../models/author";

const router = Router();

// In-memory array of authors
const authors: Author[] = [
    {
        id: 1,
        name: "J.K. Rowling",
        email: "jkrowling@example.com"
    },
    {
        id: 2,
        name: "George R.R. Martin",
        email: "grrm@example.com"
    }
];

// GET /authors
// Returns all authors
// tell Express in server.ts that this router represents /authors
router.get("/", (req, res) => {
    res.status(200).json(authors);
});

// POST /authors
// Creates a new author
router.post("/", (req, res) => {
    const { name, email } = req.body;

    const newAuthor: Author = {
        id: authors.length + 1,
        name,
        email
    };

    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

export default router;