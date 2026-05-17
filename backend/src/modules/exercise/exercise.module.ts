import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/shared/infrastructure/cloudinary/cloudinary.module';
import { ExerciseRepositoryPort } from './core/ports/output/exercise.repository.port';
import { PrismaExerciseRepository } from './infrastructure/repositories/prisma-exercise.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {  expiresIn: "15m" },
    }),
    CloudinaryModule,
  ],
  providers: [
    {
      provide: ExerciseRepositoryPort,
      useClass: PrismaExerciseRepository,
    },
  ],
})
export class ExerciseModule {}
