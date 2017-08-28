import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class LessonsService {

  constructor(private af: AngularFireDatabase) {
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
}
