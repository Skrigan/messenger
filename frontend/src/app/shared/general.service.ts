import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {chat, User, UserInfo} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public token = null;
  public user = null;
  chats: any[];
  search: any = [];

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getUsers():Observable<User> {
    return this.http.get<User>('http://127.0.0.1:5000/auth/users')
  }

  getUsersByNumber(number: string):Observable<UserInfo> {
    return this.http.post<UserInfo>('http://127.0.0.1:5000/auth/usersByNumber', number)
  }

  getChats():Observable<any[]> {
    return this.http.post<any[]>('http://127.0.0.1:5000/auth/getChats', { _id: this.user.id })
  }



  register(user: User):Observable<User> {
    return this.http.post<User>('http://127.0.0.1:5000/auth/registration', user)
  }

  login(user: User): Observable<{token: string, user: UserInfo}> {
    return this.http.post<{token: string, user: UserInfo}>('http://127.0.0.1:5000/auth/login', user)
      .pipe(
        tap(
          ({token, user}) => {
            // token = token + "123"
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.setToken(token);
            this.setUser(user);
          }
        )
      );
  }

  sendMessage(message: any):Observable<any>  {
    return this.http.post<any>('http://127.0.0.1:5000/auth/sendMessage', message)
  }

  newChat(message: any):Observable<any>  {
    return this.http.post<any>('http://127.0.0.1:5000/auth/newChat', message)
  }

  setToken(token: string) {
    this.token = token;
    console.log('Установка токена: ', this.token);
  }

  getToken(): string {
    return this.token;
  }

  setUser(user: UserInfo) {
    this.user = user;
    console.log('Установка user: ', this.user);
  }

  getUser(): UserInfo {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }



}
