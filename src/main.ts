import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoDBStore from 'connect-mongodb-session';

import { AppModule } from './app.module';

const mongoStore = MongoDBStore(session);

const store = new mongoStore({
	collection: 'userSessions',
	uri: process.env.DATABASE_URL,
	expires: 6 * 30 * 24 * 60 * 60 * 1000
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.use(cookieParser());
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			saveUninitialized: false,
			resave: false,
			cookie: {
				maxAge: 6 * 30 * 24 * 60 * 60 * 1000, // 180 days
				httpOnly: true,
				sameSite: false,
				secure: process.env.NODE_ENV === 'production'
			},
			store
		})
	);
	app.enableCors({
		origin: [process.env.CLIENT_ORIGIN],
		credentials: true
	});

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
