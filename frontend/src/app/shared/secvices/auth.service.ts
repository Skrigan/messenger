import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('http://127.0.0.1:5000/auth/users', user);
  }

  register() {

  }
}
