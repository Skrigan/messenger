import {Injectable} from "@angular/core";
import {GeneralService} from "../general.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth: GeneralService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      })
      console.log('TOKEN INTERCEPTED!!');
    }
    console.log('req: ', req);
    return next.handle(req);
  }
}
