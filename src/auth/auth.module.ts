import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
	controllers: [AuthController],
	providers: [GoogleStrategy, AuthService, PrismaService, SessionSerializer, UserService]
})
export class AuthModule {}
