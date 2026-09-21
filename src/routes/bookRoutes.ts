import { Router } from "express";
import { Book } from "../models/book";
import { books } from "../data/books"
import { validateBook } from "../middleware/validation";

const router = Router();

// GET /books
// return all books
router.get("/", (req, res) => {
    res.status(200).json(books);
});

// POST /books
// create a new book
router.post("/", validateBook, (req, res) => {
    const { title, year, authorId } = req.body;
    const duplicateBook = books.find((book) =>
            book.title.toLowerCase() === title.toLowerCase() &&
            book.authorId === authorId
    );

    if (duplicateBook) {
        return res.status(409).json({message: "A book with this title already exists for this author"});
    }
    const newBook: Book = {id: books.length + 1, title, year, authorId};
    books.push(newBook);
    res.status(201).json(newBook);
});

// GET /books/:id
// return a single book by ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({message: "Book not found"});
    }
    res.status(200).json(book);
});

// PUT /books/:id
// Updates an existing book
router.put("/:id", validateBook, (req, res) => {
    const id = Number(req.params.id);
    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({message: "Book not found"});
    }

    const { title, year, authorId } = req.body;
// prevent updating a book and making it a duplicate of another existing book.
    const duplicateBook = books.find((existingBook) => existingBook.id !== id &&
     existingBook.title.toLowerCase() === title.toLowerCase() && existingBook.authorId === authorId);

     if (duplicateBook) {
        return res.status(409).json({message: "A book with this title already exists for this author"});
    }
    book.title = title;
    book.year = year;
    book.authorId = authorId;

    res.status(200).json(book);
});

// DELETE /books/:id
// delete an existing book
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({message: "Book not found"});
    }
    const deletedBook = books.splice(bookIndex, 1)[0];
        res.status(200).json({message: "Book deleted successfully"});
});

export default router;