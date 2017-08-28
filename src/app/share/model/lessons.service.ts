import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Lesson} from "./lesson";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {FirebaseApp} from "angularfire2";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LessonsService {
  sdkDb: any;

  constructor(private af: AngularFireDatabase, @Inject(FirebaseApp) fb) {
    this.sdkDb = fb.database().ref();
  }

  findAllLessons(): Observable<Lesson[]> {
    return this.af.list('lessons')
      .map(Lesson.fromJsonList);
  }

  findLessonByUrl(lessonUrl): Observable<Lesson> {
    return this.af.list('lessons', {
      query: {
        orderByChild: 'url',
        equalTo: lessonUrl
      }
    })
      .map(result => Lesson.fromJson(result[0]))
  }

  loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.af.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        startAt: lessonId,
        limitToFirst: 2
      }
    })
      .map(results => {
        if (results[1]) {
          return results[1].$key;
        } else {
          swal('已经是最后一个了', '', 'warning');
          return results[0].$key;
        }
      })
      .switchMap(lessonId => this.af.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }

  loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.af.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        endAt: lessonId,
        limitToLast: 2
      }
    })
      .map(results => results[0].$key)
      .switchMap(lessonId => this.af.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }

  createNewLesson(courseId: string, lesson: any): Observable<any> {
    const lessonsToSave = Object.assign({}, lesson, {courseId});

    console.log('lessonsToSave: ', lessonsToSave);

    const newLessonKey = this.sdkDb.child('lessons').push().key;

    console.log(newLessonKey);

    let dataToSave = {};
    dataToSave[`lessons/` + newLessonKey] = lessonsToSave;
    dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;
    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err => {
          subject.next(err);
          subject.complete();
        }
      );
    return subject.asObservable();
  }
}
