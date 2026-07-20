import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseService],
  exports: [CourseService]

})
export class CourseModule {}
