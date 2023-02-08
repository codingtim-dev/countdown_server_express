import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }

  getTech():Observable<any> {
    return this.httpClient.get("http://localhost:3000/tech")
  }
}
