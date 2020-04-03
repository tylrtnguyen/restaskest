import { CanActivate, ActivatedRouteSnapshot,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ManagerDashboardGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.authService.getAuthStatus();
        const isManager = this.authService.getUserRole();
        if (!isAuth || isManager !== 'manager'){
            this.router.navigate(['/']);
        }
        return true
    }

}