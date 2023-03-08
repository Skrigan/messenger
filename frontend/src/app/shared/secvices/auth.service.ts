import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {NewUser, User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;

  constructor(private http: HttpClient) {

  }

  getUsers():Observable<NewUser> {
    return this.http.get<NewUser>('http://127.0.0.1:5000/auth/users')
  }

  register(user: NewUser):Observable<NewUser> {
    return this.http.post<NewUser>('http://127.0.0.1:5000/auth/registration', user)
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('http://127.0.0.1:5000/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
            console.log('Установка токена: ', this.token);
          }
        )
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token; //!!!!!!!!!!!!!!!!
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

}
