import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { GoogleAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
	@Get('google/login')
	@UseGuards(GoogleAuthGuard)
	handleLogin() {
		return {};
	}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	handleRedirect() {
		return {
			message: 'Authenticated'
		};
	}

	@Get('logout')
	logout(@Req() request: Request) {
		request.logOut({ keepSessionInfo: false }, () => {
			return false;
		});

		return {
			message: 'User logged out'
		};
	}
}
