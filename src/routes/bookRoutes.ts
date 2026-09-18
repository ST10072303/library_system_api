import { Router } from "express";
import { Book } from "../models/book";

const router = Router();

// In-memory array of books
const books: Book[] = [
    {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        year: 1997,
        authorId: 1
    },
    {
        id: 2,
        title: "A Game of Thrones",
        year: 1996,
        authorId: 2
    }
];

// GET /books
// Returns all books
router.get("/", (req, res) => {
    res.status(200).json(books);
});

// POST /books
// Creates a new book
router.post("/", (req, res) => {
    const { title, year, authorId } = req.body;
    const newBook: Book = {id: books.length + 1, title, year, authorId};

    books.push(newBook);

    res.status(201).json(newBook);
});

export default router;