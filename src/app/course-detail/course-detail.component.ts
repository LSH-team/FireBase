import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../share/model/courses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Lesson} from "../share/model/lesson";
import {Observable} from "rxjs/Observable";
import {Course} from "../share/model/course";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseUrl: any;

  lessons: Lesson[] = [];
  courses: Observable<Course>;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    this.courses = this.coursesService.findCourseByUrl(this.courseUrl);
    // this.lessons = this.coursesService.findLessonsForCourse(courseUrl);
    this.coursesService.loadFirstLessonsPage(this.courseUrl, 2)
      .subscribe(lessons => this.lessons = lessons);

  }

  previous() {
    this.coursesService.loadPreviousPage(
      this.courseUrl,
      this.lessons[0].$key,
      2
    )
      .subscribe(lessons => {
        if (lessons.length === 0) {
          swal('已经是第1页了', '', 'warning');
        } else {
          this.lessons = lessons;
        }
      });
  }

  next() {
    this.coursesService.loadNextPage(
      this.courseUrl,
      this.lessons[this.lessons.length - 1].$key,
      2
    )
      .subscribe(lessons => {
        if (lessons.length === 0) {
          swal('已经是最后一页了', '', 'warning');
        } else {
          this.lessons = lessons;
        }
      });
  }

  navigateLessonDetail(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }

}
