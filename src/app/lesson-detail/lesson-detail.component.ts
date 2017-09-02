import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Lesson} from "../share/model/lesson";
import {LessonsService} from "../share/model/lessons.service";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit, OnDestroy {
  lesson: Lesson;
  constructor(private route: ActivatedRoute, private lessonsService: LessonsService, private router: Router) { }

  ngOnInit() {
    this.route.params.switchMap(params => {
      const lessonUrl = params['id'];
      return this.lessonsService.findLessonByUrl(lessonUrl);
    })
      .subscribe(lesson => this.lesson = lesson);
  }

  previous() {
    this.lessonsService.loadPreviousLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  next() {
    this.lessonsService.loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  delete() {
    // this.lessonsService.lessonDelete(this.lesson.$key, this.lesson.courseId);
    this.lessonsService.deleteLesson(this.lesson.$key)
      .subscribe(
        () => swal('删除成功', '', 'success')
      );
  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }

  ngOnDestroy () {

  }

}
