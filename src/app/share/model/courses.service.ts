import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Course} from "./course";
import {AngularFireDatabase} from "angularfire2/database";
import {Lesson} from "./lesson";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) {

  }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses')
      // .do(console.log)
      .map(Course.fromJsonList);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
   return this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
      }
    })
     // .do(console.log)
     .map(results => results[0]);
  }

  findLessonKeysPerCourseUrl(courseUrl: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .switchMap(course => this.db.list('lessonsPerCourse/' + course.$key, query))
      // .do(console.log)
      .map(lspc => lspc.map(lpc => lpc.$key));
  }

  findLessonsForLessonKeys(lessonKeys: Observable<string[]>): Observable<Lesson[]> {
    return lessonKeys
      .map(lspc => lspc.map(lessonKey => this.db.object('lessons/' + lessonKey)))
      // .do(console.log)
      .flatMap(fbojs => Observable.combineLatest(fbojs))
      .do(console.log)
  }

  findLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl));

  }

  loadFirstLessonsPage(courseUrl: string, pageSize: number): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        limitToFirst: pageSize
      }
    })
    )
  }

  loadNextPage(courseUrl: string, lessonKey: string, pageSize: number): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        orderByKey: true,
        startAt: lessonKey,
        limitToFirst: pageSize + 1
      }
    })).map(lessons => lessons.slice(1, lessons.length));
  }

  loadPreviousPage(courseUrl: string, lessonKey: string, pageSize: number): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        orderByKey: true,
        endAt: lessonKey,
        limitToLast: pageSize + 1
      }
    }))
      .map(lessons => lessons.slice(0, lessons.length - 1));
  }
}

