import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import appConfig from './config/app.config';
import colorsConfig from './config/colors.config';

async function bootstrap() {
	const { port, host } = appConfig;
	const { cyan } = colorsConfig;

	try {
		const app = await NestFactory.create(AppModule);
		app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
		app.useGlobalFilters(new HttpExceptionFilter());
		app.setGlobalPrefix('api/v1');
		// Start the server
		app.listen(port, host, () => {
			(new Logger('Server')).log(`Listening on ${cyan}http://${host}:${port}`); 
		});
	} catch (error) {
		console.error(error);
	}
}
bootstrap();
