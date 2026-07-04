# Lab Task 03: University System API

This standalone NestJS project demonstrates dependency injection in three forms:

- Intra-module DI: `CourseController` uses `CourseService`
- Inter-module DI: `EnrollmentService` uses `CourseService`
- Circular DI: `EnrollmentService` and `NotificationService` use each other with `forwardRef()`

## Run

```bash
npm install
npm run start:dev
```

## Course Routes

- `GET /course`
- `GET /course/:id`
- `POST /course`

## Enrollment Routes

- `GET /enrollment`
- `POST /enrollment`

## Notification Routes

- `POST /notification/send`
- `POST /notification/check`
