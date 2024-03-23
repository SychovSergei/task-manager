import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of, tap } from "rxjs";

import { AuthService } from "../auth.service";
import { IUserRegistrationDto } from "./user.model";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regForm!: FormGroup;
  isSubmit: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      firstName: new FormControl("Serg", [
        Validators.required, Validators.minLength(2)
      ]),
      lastName: new FormControl("Sych", [
        Validators.required, Validators.minLength(2)
      ]),
      email: new FormControl("sychov.sergei@gmail.com", [
        Validators.required, Validators.email
      ]),
      password: new FormControl("123456", [
        Validators.required, Validators.minLength(6)
      ]),
      passwordConfirm: new FormControl("123456", [
        Validators.required
      ]),
      agree: new FormControl(true, [Validators.required, Validators.requiredTrue]),
    })
  }

  register() {
    const user: IUserRegistrationDto = {
      firstName: this.regForm.get('firstName')!.value,
      lastName: this.regForm.get('lastName')!.value,
      email: this.regForm.get('email')!.value,
      password: this.regForm.get('password')!.value,
    };
    console.log("Register", user);

    this.authService.registration(user)
      .pipe(
        tap((res) => {
          console.log("res===", res); }),
        catchError((error) => {
          console.log('Error caught:', error);
          // TODO handle the error here
          return of('Fallback Value');
        })
      )
      .subscribe({
        next: (result) => {
          console.log("next result ===", result);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
