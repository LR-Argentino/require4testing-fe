import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../utils/app-constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(AppConstants.TOKEN.toString());
    console.log(token)
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        ...(token && {'Authorization': `Bearer ${token}`})
      }
    })
    console.log(`Request header size: ${JSON.stringify(authReq.headers).length}`);

    return next.handle(authReq);
  }
}
