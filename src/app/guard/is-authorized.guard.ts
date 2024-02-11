import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DynamicTemplateService } from '../services/dynamic-template.service';
import { UserAccountService } from '../services/user-account.service'

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedGuard implements CanActivate {
  constructor(public dynamicTemplateService: DynamicTemplateService, private userAccountService: UserAccountService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.dynamicTemplateService.testAPI().subscribe((data: any) => {
    }, (error) => {
      try{
        if (error.response.status == 401) {
          localStorage.clear();
          return this.router.navigate(['/login']);
        }
      }catch(error: any){
        localStorage.clear();
        return this.router.navigate(['/login']);
      }
      return true
    })
    let userInfo = this.userAccountService.getUserAccount();

    if (userInfo == null) {
      localStorage.clear()
      return this.router.navigate(['/login'])
    };

    return true;
  }

}
