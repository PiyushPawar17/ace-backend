import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { GoogleAuthGuard } from './utils/Guards';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
	@Get('google/login')
	@UseGuards(GoogleAuthGuard)
	handleLogin() {
		return {};
	}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	handleRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		res.cookie('userId', req.user.id, {
			domain: process.env.CLIENT_ORIGIN,
			httpOnly: true,
			secure: true,
			sameSite: 'none'
		});

		return res.redirect(process.env.LOGIN_REDIRECT_URL);
	}

	@Get('/cookies')
	@UseGuards(AuthGuard)
	setCookies(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		res.cookie('userId', req.user.id, {
			domain: process.env.CLIENT_ORIGIN,
			httpOnly: true,
			secure: true,
			sameSite: 'none'
		});

		return res.end();
	}
	@Get('logout')
	logout(@Req() req: Request, @Res() res: Response) {
		req.logOut({ keepSessionInfo: false }, () => {
			res.clearCookie('userId');
			return res.redirect(process.env.LOGOUT_REDIRECT_URL);
		});
	}
}
