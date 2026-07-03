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
    expect(service.getAllCourses()).toEqual({
      message: 'All courses fetched successfully',
      data: [],
    });
  });

  it('should return course by id response', () => {
    expect(service.getCourseById('10')).toEqual({
      message: 'Course fetched successfully',
      id: '10',
    });
  });

  it('should return created course data', () => {
    const course = {
      name: 'NestJS Fundamentals',
      code: 'CS101',
      instructor: 'John Doe',
      credits: 3,
    };

    expect(service.createCourse(course)).toEqual({
      message: 'Course created successfully',
      data: course,
    });
  });
});
