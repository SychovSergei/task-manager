import { Injectable } from "@angular/core";
import { environment } from "../../environment";

@Injectable({
  providedIn: "root"
})
export class ServerUrlService {

  getServerUrl(): string {
    return environment.production ? environment.apiUrl : "";
  }

}
