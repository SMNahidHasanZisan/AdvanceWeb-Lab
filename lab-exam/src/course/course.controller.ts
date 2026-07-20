import {Body, Controller ,Get ,Delete } from '@nestjs/common';
import { CourseService } from './course.service';
@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
}
@Get('course')
async getAllCourses() {
    return this.courseService.getAllCourses();
}
@Delete('course/:id')
async deleteCourse(@Param('id') id: number) {
    return this.courseService.deleteCourse(id);
}