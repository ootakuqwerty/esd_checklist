import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DynamicTemplateService } from '../services/dynamic-template.service'

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedGuard implements CanActivate {
  constructor(public dynamicTemplateService: DynamicTemplateService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.dynamicTemplateService.testAPI().subscribe((data: any) => {
    }, (error) => {
      console.log(error)
      if (error.response.status == 401) {
        localStorage.clear();
        return this.router.navigate(['/login']);
      }
      return true
    })
    return true;
  }

}
