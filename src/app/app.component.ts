import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'Restaskest - Restaurant Task done Fastest';
  userIsAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
      this.authService.autoAuthUser();
      this.userIsAuthenticated = this.authService.getAuthStatus();
      this.authListenerSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe()
  }

}
