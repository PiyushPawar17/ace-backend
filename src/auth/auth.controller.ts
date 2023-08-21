import { Controller, Get, Req, Redirect, UseGuards } from '@nestjs/common';
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
	@Redirect('http://localhost:3000/tasks', 301)
	handleRedirect() {
		return {};
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
