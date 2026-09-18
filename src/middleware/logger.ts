import { Request, Response, NextFunction } from "express";

// logger middleware
// logs the HTTP method and URL of every request.
export const logger = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.url}`);
    next();
};