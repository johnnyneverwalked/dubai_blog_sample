
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = window.localStorage.getItem('token');
    let modifiedReq = null;
    if (token && !req.headers.get('token')) {
      modifiedReq = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token}`)
      });
    }
    return next.handle(modifiedReq || req);
  }

}
