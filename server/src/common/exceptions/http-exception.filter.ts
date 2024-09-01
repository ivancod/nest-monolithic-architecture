import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx        = host.switchToHttp();
        const response   = ctx.getResponse<Response>();
        const request    = ctx.getRequest<Request>();
        const status     = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message    = exception.response?.message || exception.message || 'Internal server error';
		
        (new Logger('HTTP')).error(message, exception.stack, 'HttpExceptionFilter');

        response.status(status).json({
            status: 'error',
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
