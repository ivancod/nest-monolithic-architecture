import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseTransformMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const originalSend = res.send.bind(res);

		res.send = (body: any) => {
			if (res.statusCode >= HttpStatus.OK && res.statusCode < HttpStatus.BAD_REQUEST) {
				body = {
					status: 'success',
					data: body,
				};
			} else {
				body = {
					status: 'error',
					message: body.message || 'An error occurred',
				};
			}
			return originalSend(body);
		};

		next();
	}
}