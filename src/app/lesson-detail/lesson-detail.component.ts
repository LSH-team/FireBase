import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Lesson} from "../share/model/lesson";
import {LessonsService} from "../share/model/lessons.service";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson;
  constructor(private route: ActivatedRoute, private lessonsService: LessonsService, private router: Router) { }

  ngOnInit() {
    this.route.params.switchMap(params => {
      const lessonUrl = params['id'];
      console.log(lessonUrl)
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

  edit() {

  }

  delete() {

  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }

}
