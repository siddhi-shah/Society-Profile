import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {  Observable } from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';


@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private _tokenService: TokenService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Observable<boolean>{

    const redirectUrl = route['_routerState']['url'];
    console.log("******", route['_routerState']);
      return new Observable<boolean>((observer) => {
        this._tokenService.isLogged().subscribe(isValid => {
          if(isValid) {
            console.log("token is valid*****");
            observer.next(true);
          } else {
            this.router.navigateByUrl(
              this.router.createUrlTree(
                ['login'], {
                  queryParams: {
                    redirectUrl:redirectUrl
                  }
                }
              )
            );
            observer.next(false);
          }
        })
      })
    }
}