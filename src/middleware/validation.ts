import { Request, Response, NextFunction } from "express";
import { authors } from "../data/authors";

// validates author data for POST and PUT requests
export const validateAuthor = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email } = req.body;

    if (!name || typeof name !== "string") {
        res.status(400).json({message: "Author name is required and must be a string"});
        return;
    }

    if (!email || typeof email !== "string") {
        res.status(400).json({message: "Author email is required and must be a string"});
        return;
    }
    next();
};

// validates book data for POST and PUT requests
export const validateBook = (req: Request, res: Response, next: NextFunction): void => {
    const { title, year, authorId } = req.body;

    if (!title || typeof title !== "string") {
        res.status(400).json({message: "Book title is required and must be a string"});
        return;
    }

    if (year === undefined || typeof year !== "number" || !Number.isInteger(year)) {
        res.status(400).json({message: "Book year is required and must be an number"});
        return;
    }

    if (authorId === undefined || typeof authorId !== "number" || !Number.isInteger(authorId)) {
        res.status(400).json({message: "authorId is required and must be an number"});
        return;
    }

    const authorExists = authors.some((author) => author.id === authorId);
    if (!authorExists) {
        res.status(400).json({message: "Invalid authorId: author does not exist"});
        return;
    }
    next();
};