import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../share/security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor (private fb: FormBuilder,
               private authService: AuthService,
               private router: Router) {
                this.form = this.fb.group({
                  email: ['', Validators.required],
                  password: ['', Validators.required],
                  confirm: ['', Validators.required]
                });
  }

  ngOnInit() {

  }

  isPasswordMatch () {
    const val = this.form.value;
    return val && val.password && val.password === val.confirm;
  }

  signUp () {
    const val = this.form.value;

    this.authService.signUp(val.email, val.password)
      .subscribe(
        () => {
          swal('注册成功', '', 'success');
          this.router.navigateByUrl('./home')
        },
        (err: any) => swal('注册失败', err, 'warning')
      )
  }

}
