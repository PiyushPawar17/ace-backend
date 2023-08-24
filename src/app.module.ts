import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule.register({ session: true }),
		AuthModule,
		UserModule,
		TaskModule,
		ListModule
	],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}
