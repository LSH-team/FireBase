import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule, FirebaseApp} from "angularfire2";
import {firebaseConfig} from "environments/firebaseConfig";
import { HomeComponent } from './home/home.component';
import {LessonsService} from "./share/model/lessons.service";
import 'rxjs/add/operator/do';
import { LessonListComponent } from './lesson-list/lesson-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [LessonsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
