import {Component, enableProdMode, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor () {
    // const testArrs$: FirebaseListObservable<any> = af.list('testArray');
    // const testArr$ = af.object('age');
    //
    // testArr$.subscribe(console.log);
  }


  ngOnInit () {}

}
