import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  visible = true;
  userIsAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authListenerSub = this.authService.getAuthStatusListener()
                                           .subscribe(isAuthenticated => {
                                             this.userIsAuthenticated = isAuthenticated;
                                           })
  }

  sideBarToggler() {
    this.visible = !this.visible;
  }
}
