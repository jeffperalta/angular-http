import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Request is on its way")
        const modifiedRequest = req.clone({
            headers: req.headers.append("Auth", "1231ABC")
        })
        return next.handle(modifiedRequest);
    }
}