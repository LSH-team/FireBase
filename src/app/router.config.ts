 import {Route} from "@angular/router";
 import {HomeComponent} from "./home/home.component";

 export const RouterConfig: Route[] = [
   {
     path: 'home',
     component: HomeComponent
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
