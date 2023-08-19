import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';

import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(private readonly authService: AuthService) {
		super();
	}

	serializeUser(user: User, done: Function) {
		done(null, user.id);
	}

	async deserializeUser(payload: string, done: Function) {
		const user = await this.authService.findUserById(payload);

		if (!user) {
			return done(null, null);
		}

		return done(null, user);
	}
}
