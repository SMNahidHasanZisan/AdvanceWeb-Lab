import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Course routes (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/course (GET)', () => {
    return request(app.getHttpServer()).get('/course').expect(200).expect({
      message: 'All courses fetched successfully',
      data: [],
    });
  });

  it('/course/5 (GET)', () => {
    return request(app.getHttpServer()).get('/course/5').expect(200).expect({
      message: 'Course fetched successfully',
      id: '5',
    });
  });

  it('/course (POST)', () => {
    return request(app.getHttpServer())
      .post('/course')
      .send({
        name: 'NestJS Fundamentals',
        code: 'CS101',
        instructor: 'John Doe',
        credits: 3,
      })
      .expect(201)
      .expect({
        message: 'Course created successfully',
        data: {
          name: 'NestJS Fundamentals',
          code: 'CS101',
          instructor: 'John Doe',
          credits: 3,
        },
      });
  });

  it('/course (POST) rejects invalid body', () => {
    return request(app.getHttpServer())
      .post('/course')
      .send({
        name: '',
        code: 'CS101',
        instructor: '',
        credits: 10,
      })
      .expect(400);
  });

  it('/course (POST) rejects unknown fields', () => {
    return request(app.getHttpServer())
      .post('/course')
      .send({
        name: 'NestJS Fundamentals',
        code: 'CS101',
        instructor: 'John Doe',
        credits: 3,
        room: 'A-101',
      })
      .expect(400);
  });

  it('/course/5 (PUT)', () => {
    return request(app.getHttpServer())
      .put('/course/5')
      .send({
        name: 'NestJS Advanced',
        code: 'CS201',
        instructor: 'Jane Doe',
        credits: 4,
      })
      .expect(200)
      .expect({
        message: 'Course updated successfully',
        id: '5',
        data: {
          name: 'NestJS Advanced',
          code: 'CS201',
          instructor: 'Jane Doe',
          credits: 4,
        },
      });
  });

  it('/course/5 (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/course/5')
      .send({
        name: 'NestJS Advanced',
        credits: 4,
      })
      .expect(200)
      .expect({
        message: 'Course patched successfully',
        id: '5',
        updatedFields: ['name', 'credits'],
      });
  });

  it('/course/5 (DELETE)', () => {
    return request(app.getHttpServer()).delete('/course/5').expect(200).expect({
      message: 'Course deleted successfully',
      id: '5',
    });
  });

  it('/course/5/upload (POST)', () => {
    return request(app.getHttpServer())
      .post('/course/5/upload')
      .attach('file', Buffer.from('course material'), 'notes.pdf')
      .expect(201)
      .expect(({ body }) => {
        expect(body.message).toBe('Material uploaded successfully');
        expect(body.courseId).toBe('5');
        expect(body.filename).toMatch(/notes\.pdf$/);
        expect(body.path).toContain('uploads/');
      });
  });

  it('/course/5/upload (POST) rejects invalid file type', () => {
    return request(app.getHttpServer())
      .post('/course/5/upload')
      .attach('file', Buffer.from('bad file'), 'notes.txt')
      .expect(400);
  });
});
