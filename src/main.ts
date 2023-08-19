import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			saveUninitialized: false,
			resave: false,
			cookie: {
				maxAge: 6 * 30 * 24 * 60 * 60 * 1000, // 180 days
				httpOnly: true
			},
			store: new PrismaSessionStore(
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				new PrismaClient(),
				{
					checkPeriod: 10 * 60 * 1000, // 10 minutes
					dbRecordIdIsSessionId: true,
					dbRecordIdFunction: undefined
				}
			)
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	const port = process.env.PORT || 5000;

	await app.listen(port);

	if (process.env.NODE_ENV === 'development') {
		Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
	} else {
		Logger.log(`🚀 Application is running on port ${port}`);
	}
}
bootstrap();
