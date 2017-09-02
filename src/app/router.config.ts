 import {Route} from "@angular/router";
 import {HomeComponent} from "./home/home.component";
 import {CourseDetailComponent} from "./course-detail/course-detail.component";
 import {CoursesComponent} from "./courses/courses.component";
 import {NewLessonComponent} from "./new-lesson/new-lesson.component";
 import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";
 import {EditLessonComponent} from "./edit-lesson/edit-lesson.component";
 import {LessonResolver} from "./share/model/lesson.resolver";
 import {LoginComponent} from "./login/login.component";
 import {RegisterComponent} from "./register/register.component";
 import {AuthGuard} from "./share/security/auth.guard";

 export const RouterConfig: Route[] = [
   {
     path: 'home',
     children: [
       {
         path: '',
         component: HomeComponent
       }
     ]
   },
   {
     path: 'courses',
     children: [
       {
         path: ':id',
         children: [
           {
             path: '',
             component: CourseDetailComponent
           },
           {
             path: 'new',
             component: NewLessonComponent
           }
         ]
       },
       {
         path: '',
         component: CoursesComponent
       }
     ]
   },
   {
     path: 'lessons/:id',
     children: [
       {
         path: '',
         component: LessonDetailComponent,
         canActivate: [AuthGuard]
       },
       {
         path: 'edit',
         component: EditLessonComponent,
         resolve: {
           lesson: LessonResolver
         }
       }
     ]
   },
   {
     path: 'login',
     component: LoginComponent
   },
   {
     path: 'register',
     component: RegisterComponent
   },
   {
     path: '',
     redirectTo: 'home',
     pathMatch: 'full'
   },
   {
     path: '**',
     redirectTo: 'home'
   }
 ];
