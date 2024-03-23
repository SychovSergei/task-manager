import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUserLoginDto, IUserRegistrationDto } from "./register/user.model";

@Injectable()
export class AuthService {

  private registrationUrl: string = "/api/auth/registration";
  private loginUrl: string = "/api/auth/login";

  constructor(private http: HttpClient) {
  }

  registration(userData: IUserRegistrationDto) {
    return this.http.post(this.registrationUrl, userData);
  }

  login(userData: IUserLoginDto) {
    return this.http.post(this.loginUrl, userData);
  }
}
