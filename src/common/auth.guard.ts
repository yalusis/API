import { IMiddleWares } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';

export class AuthGuard implements IMiddleWares {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (!req.user) {
			res.status(401).send({ error: 'Такого користувача не існує' });
		} else {
			next();
		}
	}
}
