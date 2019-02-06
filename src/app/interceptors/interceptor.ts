import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!environment.production && req.method === 'GET') {
      switch (req.url.slice(req.url.lastIndexOf('/') + 1)) {
        case 'news':
          return next.handle(req.clone({ url: 'http://localhost:3000/news' }));
        case 'trip-dates-all':
          return next.handle(req.clone({ url: 'http://localhost:3000/trip-dates-all' }));
        default:
          return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }
}
