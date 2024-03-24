import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUserLoginDto, IUserRegistrationDto } from "./register/user.model";
import { ServerUrlService } from "../services/server-url.service";

@Injectable()
export class AuthService {

  private registrationUrl: string = "/api/auth/registration";
  private loginUrl: string = "/api/auth/login";
  private registrationUrl: string = this.serverUrl.getServerUrl() + "/auth/registration";
  private loginUrl: string = this.serverUrl.getServerUrl() + "/auth/login";

  constructor(private http: HttpClient,
              private serverUrl: ServerUrlService) {
  }

  registration(userData: IUserRegistrationDto) {
    return this.http.post(this.registrationUrl, userData);
  }

  login(userData: IUserLoginDto) {
    return this.http.post(this.loginUrl, userData);
  }
}
