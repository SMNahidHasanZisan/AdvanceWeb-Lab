import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should return all courses response', () => {
    expect(service.getAllCourses()).toBe('Get All Courses from Service');
  });

  it('should return course by id response', () => {
    expect(service.getCourseById('10')).toBe(
      'Get Course with ID: 10 from Service',
    );
  });
});
