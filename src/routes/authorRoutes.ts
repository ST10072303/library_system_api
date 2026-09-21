import { Router } from "express";
import { Author } from "../models/author";
import { authors } from "../data/authors";
import { validateAuthor } from "../middleware/validation";

const router = Router();

// GET /authors
// returns all authors
// tell Express in server.ts that this router represents /authors
router.get("/", (req, res) => {
    res.status(200).json(authors);
});

// POST /authors
// creates a new author
router.post("/", validateAuthor, (req, res) => {
    const { name, email } = req.body;
    const newAuthor: Author = {id: authors.length + 1, name, email};

    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

// GET /authors/:id
// returns a single author by ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const author = authors.find((author) => author.id === id);

    if (!author) {
        return res.status(404).json({message: "Author not found"});
    }
    res.status(200).json(author);
});

// PUT /authors/:id
// Updates an existing author
router.put("/:id", validateAuthor, (req, res) => {
    const id = Number(req.params.id);
    const author = authors.find((author) => author.id === id);

    if (!author) {
        return res.status(404).json({message: "Author not found"});
    }

    const { name, email } = req.body;
    author.name = name;
    author.email = email;

    res.status(200).json(author);
});

// DELETE /authors/:id
// Deletes an existing author
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const authorIndex = authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
        return res.status(404).json({message: "Author not found"});
    }

    const deletedAuthor = authors.splice(authorIndex, 1)[0];
    res.status(200).json({message: "Author deleted successfully"});
});

export default router;