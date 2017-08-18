import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../share/model/courses.service";
import {ActivatedRoute} from "@angular/router";
import {Lesson} from "../share/model/lesson";
import {Observable} from "rxjs/Observable";
import {Course} from "../share/model/course";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  lessons: Observable<Lesson[]>;
  courses: Observable<Course>;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const courseUrl = this.route.snapshot.params['id'];
    this.courses = this.coursesService.findCourseByUrl(courseUrl);
    this.lessons = this.coursesService.findLessonsForCourse(courseUrl);
  }

}
