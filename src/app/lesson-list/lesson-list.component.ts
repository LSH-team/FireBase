import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../share/model/lesson";

@Component({
  selector: 'lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
  @Input() lessons: Lesson[];
  constructor() { }

  ngOnInit() {
  }

}
