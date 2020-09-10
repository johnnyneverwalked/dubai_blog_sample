import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class LandmarksService {

  private readonly baseUrl: string = `http://localhost:5000/landmarks`;

  constructor(
    public httpClient: HttpClient
  ) {
  }

  public retrieve() {
    return this.httpClient.get(this.baseUrl);
  }
}
