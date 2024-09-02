import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseTransformMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const originalSend = res.send.bind(res);

		res.send = (body: any) => {
			let newBody = body;

			if (res.statusCode >= HttpStatus.OK && res.statusCode < HttpStatus.BAD_REQUEST) {
				newBody = {	status: 'success', data: JSON.parse(body) };
			} else {
				newBody = {	status: 'error', message: JSON.parse(body) };
			}
			
			return originalSend(JSON.stringify(newBody));
		};

		next();
	}
}