import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {ILandmark} from '../../interfaces/ILandmark';

@Injectable({providedIn: "root"})
export class LandmarksService {

  private readonly baseUrl: string = `${environment.api}landmarks`;

  constructor(
    public httpClient: HttpClient
  ) {
  }

  public retrieve() {
    return this.httpClient.get(this.baseUrl);
  }

  public findById(_id: string) {
    return this.httpClient.get(`${this.baseUrl}/findById/${_id}`);
  }

  public update(_id: string, data: Partial<ILandmark>|any) {
    return this.httpClient.put(`${this.baseUrl}/update/${_id}`, data || {});
  }
}
