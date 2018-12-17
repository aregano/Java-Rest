import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'myheader':'my value'
    })

    request = request.clone({
      headers: headers
    });

    return next.handle(request).pipe(
      tap(data =>{console.log('Int data:',data)}),
      catchError(err =>{
        console.log('Int hanlde Error:', err);
        return throwError(err);
      })
    )

  }
}
