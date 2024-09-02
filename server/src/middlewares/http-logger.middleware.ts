import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import colorsConfig from 'src/config/colors.config';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {

    /**
     * The logger instance
     * @type {Logger}
     * @private
     */
    private logger = new Logger('HTTP');

	/**
	 * The method to be called when the middleware is executed
	 * @param {Request} request The request object
	 * @param {Response} response The response object
	 * @param {NextFunction} next The next function
	 */
	use(request: Request, response: Response, next: NextFunction): void {
		const { method, baseUrl } = request;
		const { yellow } = colorsConfig;
		const startTime = new Date().getTime();

		response.on('close', () => {
			const { statusCode } = response;

			const message = `${method} route: ${baseUrl} ${statusCode} ${yellow}+${ new Date().getTime() - startTime }ms`;

			if(statusCode >= 200 && statusCode < 400) {
				this.logger.log(message);
			} else {
				this.logger.error(message);
			}
		});

		next();
	}
}
