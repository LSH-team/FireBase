import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateUrl} from "../share/validators/validateUrl";
import {Lesson} from "../share/model/lesson";

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent implements OnInit, OnChanges {
  @Input() initialValue: any;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      url: ['', Validators.required],
      videoUrl: ['', [Validators.required, validateUrl]],
      tags: ['', Validators.required],
      longDescription: ['']
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValue']) {
      this.form.patchValue(changes['initialValue'].currentValue);
    }
  }

  ngOnInit() {

  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors
      && this.form.controls[field].errors[error];
  }

  reset() {
    this.form.reset();
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

}
