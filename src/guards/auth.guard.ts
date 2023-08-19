import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();

		if (!request.isAuthenticated()) {
			throw new ForbiddenException('Authentication required');
		}

		return request.isAuthenticated();
	}
}
