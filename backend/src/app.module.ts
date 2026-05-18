import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MuscleGroupModule } from './modules/muscle-group/muscle-group.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';
import { RoutineModule } from './modules/routine/routine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    MuscleGroupModule,
    ExerciseModule,
    RoutineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
