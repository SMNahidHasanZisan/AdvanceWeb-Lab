import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseController } from './course/course.controller';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'zisan12345',
    database: 'course',
    autoLoadEntities: true,    
    synchronize: true, CourseModule,
  ],
  controllers: [AppController, CourseController],
  providers: [AppService],
})
export class AppModule {}
