 import {Route} from "@angular/router";
 import {HomeComponent} from "./home/home.component";
 import {CourseDetailComponent} from "./course-detail/course-detail.component";
 import {CoursesComponent} from "./courses/courses.component";

 export const RouterConfig: Route[] = [
   {
     path: 'home',
     component: HomeComponent
   },
   {
     path: 'courses',
     children: [
       {
         path: ':id',
         component: CourseDetailComponent
       },
       {
         path: '',
         component: CoursesComponent
       }
     ]
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
