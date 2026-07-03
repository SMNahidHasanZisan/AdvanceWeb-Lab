import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Course routes (e2e)', () => {
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
    return request(app.getHttpServer())
      .get('/course')
      .expect(200)
      .expect('Get All Courses from Service');
  });

  it('/course/5 (GET)', () => {
    return request(app.getHttpServer())
      .get('/course/5')
      .expect(200)
      .expect('Get Course with ID: 5 from Service');
  });

  it('/course (POST)', () => {
    return request(app.getHttpServer())
      .post('/course')
      .expect(201)
      .expect('Create Course from Service');
  });

  it('/course/5 (PUT)', () => {
    return request(app.getHttpServer())
      .put('/course/5')
      .expect(200)
      .expect('Update Course 5 from Service');
  });

  it('/course/5 (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/course/5')
      .expect(200)
      .expect('Patch Course 5 from Service');
  });

  it('/course/5 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/course/5')
      .expect(200)
      .expect('Delete Course 5 from Service');
  });
});
