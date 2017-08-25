import {Component, OnInit} from '@angular/core';
import {LessonsService} from "../share/model/lessons.service";
import {Lesson} from "../share/model/lesson";
import {Course} from "../share/model/course";
import {CoursesService} from "../share/model/courses.service";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allLessons: Lesson[];
  filtered: Lesson[];
  allCourses: Course[];

  courses: FirebaseListObservable<any>;
  lesson: FirebaseObjectObservable<any>;

  firstCourse: any;

  constructor (private lessonsService: LessonsService, private coursesService: CoursesService, private af: AngularFireDatabase) {
    this.courses = af.list('courses');
    this.courses.subscribe(console.log);

    this.lesson = af.object('lessons/-KoRQPPD7NbTKX_Z4ZBZ');
    this.lesson.subscribe(console.log);

    this.courses.map(courses => courses[0])
      .do(console.log)
      .subscribe(
        course => this.firstCourse = course
      );
  }

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
    // this.filtered = this.allLessons.filter(lesson => lesson.description.includes(search));
  }

  onListPush () {
    this.courses.push({description: 'TEST NEW COURSE'})
      .then(
        () => console.log('List Push Done'),
        console.error
      );
  }

  onListRemove() {
    this.courses.remove(this.firstCourse);
  }

  onListUpdate () {
    this.courses.update(this.firstCourse, {description: 'xxxxx'});
  }

  onObjectUpdate () {
    this.lesson.update({description: 'xxlessonxxx'});
  }

  onObjectSet () {
    this.lesson.set({description: 'Add New Lesson'});
  }

  onObjectRemove () {
    this.lesson.remove();
  }
}
