import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../share/model/lessons.service";

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.scss']
})
export class NewLessonComponent implements OnInit {

  courseId: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private lessonsService: LessonsService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.queryParams['courseId'];
    console.log(this.courseId)
  }

  save (form) {
    this.lessonsService.createNewLesson(this.courseId, form.value)
      .subscribe(
        () => {
          alert('lesson created successfully. Create another lesson ?');
          form.reset();
        },
        err => alert(`error creating lesson ${err}`)
      );
  }

}
