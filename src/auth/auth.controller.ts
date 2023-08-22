import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

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
	handleRedirect(@Req() req: Request, @Res() res: Response) {
		res.cookie('userId', req.user.id);
		return res.redirect('http://localhost:3000/tasks');
	}

	@Get('logout')
	logout(@Req() req: Request, @Res() res: Response) {
		req.logOut({ keepSessionInfo: false }, () => {
			res.clearCookie('userId');
			return res.redirect('http://localhost:3000');
		});
	}
}
