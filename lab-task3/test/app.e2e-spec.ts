import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('University System routes (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/course (GET)', () => {
    return request(app.getHttpServer()).get('/course').expect(200).expect({
      message: 'All courses fetched',
      data: [],
    });
  });

  it('/course/101 (GET)', () => {
    return request(app.getHttpServer()).get('/course/101').expect(200).expect({
      message: 'Course fetched',
      id: '101',
    });
  });

  it('/course (POST)', () => {
    return request(app.getHttpServer())
      .post('/course')
      .send({ name: 'NestJS', code: 'CS301' })
      .expect(201)
      .expect({
        message: 'Course created',
        data: { name: 'NestJS', code: 'CS301' },
      });
  });

  it('/enrollment (GET)', () => {
    return request(app.getHttpServer()).get('/enrollment').expect(200).expect({
      message: 'All enrollments fetched',
      data: [],
    });
  });

  it('/enrollment (POST) uses CourseService and NotificationService', () => {
    return request(app.getHttpServer())
      .post('/enrollment')
      .send({ studentName: 'John Doe', courseId: '101' })
      .expect(201)
      .expect({
        message: 'Student enrolled successfully',
        student: 'John Doe',
        course: { message: 'Course fetched', id: '101' },
        notification: {
          message: 'Notification sent successfully',
          student: 'John Doe',
          notification: 'You are enrolled in course 101',
        },
      });
  });

  it('/notification/send (POST)', () => {
    return request(app.getHttpServer())
      .post('/notification/send')
      .send({ studentName: 'John Doe', message: 'Welcome!' })
      .expect(201)
      .expect({
        message: 'Notification sent successfully',
        student: 'John Doe',
        notification: 'Welcome!',
      });
  });

  it('/notification/check (POST)', () => {
    return request(app.getHttpServer())
      .post('/notification/check')
      .send({ studentName: 'John Doe', courseId: '101' })
      .expect(201)
      .expect({
        message: 'Enrollment checked successfully',
        student: 'John Doe',
        courseId: '101',
        enrollments: {
          message: 'All enrollments fetched',
          data: [],
        },
      });
  });
});
