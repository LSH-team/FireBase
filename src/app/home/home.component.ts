import {Component, OnInit} from '@angular/core';
import {LessonsService} from "../share/model/lessons.service";
import {Lesson} from "../share/model/lesson";
import {Course} from "../share/model/course";
import {CoursesService} from "../share/model/courses.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allLessons: Lesson[];
  filtered: Lesson[];
  allCourses: Course[];

  constructor (private lessonsService: LessonsService, private coursesService: CoursesService) {}

  ngOnInit () {
    this.lessonsService.findAllLessons()
      .do(console.log)
      .subscribe(
        lessons => this.allLessons = this.filtered = lessons
      );
    this.coursesService.findAllCourses()
      .do(console.log)
      .subscribe(
        courses => this.allCourses = courses
      );
  }

  search (search: string) {
    this.filtered = this.allLessons.filter(lesson => lesson.description.includes(search));
  }
}
