import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { IUserLoginDto, IUserRegistrationDto } from "../register/user.model";
import { catchError, of, tap } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmit: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        email: new FormControl("sychov.sergei@gmail.com", [
          Validators.required, Validators.email
        ]),
        password: new FormControl("123456", [
          Validators.required, Validators.minLength(6)
        ]),
        remember: new FormControl(false),
      }
    )
  }

  login() {
    const user: IUserLoginDto = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    };

    this.authService.login(user)
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
