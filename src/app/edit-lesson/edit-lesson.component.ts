import { Component, OnInit } from '@angular/core';
import {Lesson} from "../share/model/lesson";
import {ActivatedRoute} from "@angular/router";
import {LessonsService} from "../share/model/lessons.service";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {
  lesson: Lesson;

  constructor(private route: ActivatedRoute, private lessonsService: LessonsService) {
    route.data
      .do(console.log)
      .subscribe(
        data => this.lesson = data['lesson']
      );
  }

  ngOnInit() {
  }

  save(lesson) {
    this.lessonsService.saveLesson(this.lesson.$key, lesson)
      .subscribe(
        () => {
          swal('lesson saved successfully', '', 'success');
        },
        err => {
          swal(`error saving lesson ${err}`, '', 'warning');
        }
      )
  }

}
