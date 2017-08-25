import {Component, Input, OnInit} from '@angular/core';
import {CoursesService} from "../share/model/courses.service";
import {Course} from "../share/model/course";

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  // @Input() course: Course;
  courses: Course[];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesService.findAllCourses()
      .do(console.log)
      .subscribe(courses => this.courses = courses);
  }

}
