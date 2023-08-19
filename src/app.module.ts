import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from '@/prisma/prisma.service';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';

@Module({
	imports: [ConfigModule.forRoot(), PassportModule.register({ session: true }), AuthModule, UserModule],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}
