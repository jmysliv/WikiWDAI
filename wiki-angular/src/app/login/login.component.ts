import { UserService } from './../user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() displayLogin = new EventEmitter<boolean> ();

  form: FormGroup;
  private formSubmitAttempt: boolean;
  invalidData = false;
  // users: Array<User>;
  constructor(  private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // this.userService.getUsers().subscribe(res => {
    //   this.users = res;
    // });
  }

  changeDisplay() {
    this.displayLogin.emit(false);
  }
  get f() {
    return this.form.controls;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.invalid) { this.formSubmitAttempt = true; return; }

    this.userService.login(this.form.value.email, this.form.value.password);
    if ( this.userService.isLoggedIn === null) { this.formSubmitAttempt = true; this.invalidData = true; }

  }



}
