import { User, UserService } from './../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() displayLogin = new EventEmitter<boolean> ();
  signUpForm: FormGroup;
  private formSignUpAttempt: boolean;
  private emailAlreadyExist: boolean;
  private registrationComplete: boolean;
  invalidData = false;
  users: Array<User>;
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      conPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }
  changeDisplay() {
    this.displayLogin.emit(false);
  }

  get f() {
    return this.signUpForm.controls;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.signUpForm.get(field).valid && this.signUpForm.get(field).touched) ||
      (this.signUpForm.get(field).untouched && this.formSignUpAttempt)
    );
  }

  passwordsMustMatch() {
    return this.signUpForm.value.password === this.signUpForm.value.conPassword;
  }

  emailAlreadyExists(): boolean {
    this.emailAlreadyExist = false;
    this.users.forEach(element => {
      if (element.email === this.signUpForm.value.email) {
        this.emailAlreadyExist = true;
        return;
      }
    });
    return this.emailAlreadyExist;
  }

  onSubmit() {
    this.formSignUpAttempt = true;
    if (this.signUpForm.invalid) { return; }
    this.emailAlreadyExist = false;
    const user: User = {
      id: uuid.v4(),
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };

    if (!this.passwordsMustMatch()) { return; }

    if (this.emailAlreadyExists()) {return; }


    this.userService.addUser(user);
    this.registrationComplete = true;

  }


}
