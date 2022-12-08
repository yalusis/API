import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleWares } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'delete' | 'post' | 'patch' | 'put'>;
	middlewares?: IMiddleWares[];
}

export type ExpressReturn = Response<any, Record<string, any>>;
