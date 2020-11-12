import { HttpException, Injectable } from '@nestjs/common';
import { COURSES } from './courses.mock';

@Injectable()
export class CoursesService {
  courses = COURSES;

  getCourses(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.courses)
    })
  }

  getCourse(courseId): Promise<any> {
    let id = Number(courseId)
    return new Promise((resolve, reject) => {
      const course = this.courses.find(course => course.id === id);
      if (!course) {
        reject(new HttpException("Course doesnot exist", 404));
      } else {
        resolve(course)
      }
    })
  }

  addCourse(course): Promise<any> {
    return new Promise((resolve, reject) => {
      this.courses.push(course)
      resolve(this.courses)
    })
  }

  deleteCourse(courseId): Promise<any> {
    const id = Number(courseId);
    return new Promise((resolve, reject) => {
      let index = this.courses.findIndex(course => course.id === id);
      if (index === -1) {
        reject(new HttpException("Course does not exist", 404))
      } else {
        this.courses.splice(index, 1);
        resolve(this.courses)
      }
    })
  }
}
