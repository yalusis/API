import { NextFunction, Request, Response } from 'express';

export interface IMiddleWares {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
