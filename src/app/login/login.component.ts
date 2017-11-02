import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "../share/security/auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private firebase: AngularFireAuth,
              private authSerivce: AuthService,
              private router: Router) {
                this.form = this.fb.group({
                  email: ['', Validators.required],
                  password: ['', Validators.required]
                })
  }

  ngOnInit() {
    // this.firebase.auth.createUserWithEmailAndPassword('lsh294753@gmail.com', 'lsh')
    //   .catch(function(error) {
    //     // var errorCode = error.code;
    //     // var errorMessage = error.message;
    //     });
  }

  login() {
    const formValue = this.form.value;

    this.authSerivce.login(formValue.email, formValue.password)
      .subscribe(
        (res: any) => {
          console.log(res);
          console.log(this.authSerivce.authInfo$);
          this.router.navigate(['./home']);
        },
            (err: any) => swal('email或密码错误！', err, 'warning')
      )
  }

}
