import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lesson} from "../share/model/lesson";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
  @Input()
  lessons: Lesson[];

  @Output('lesson')
  lessonEmitter = new EventEmitter<Lesson>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  videoToUrl (url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  selectLesson(lesson: Lesson) {
    this.lessonEmitter.emit(lesson);
  }
}
