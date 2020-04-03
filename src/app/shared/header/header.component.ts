import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarEmit: EventEmitter<any> = new EventEmitter()

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarEmit.emit(null)
  }

  logout(){
    this.authService.logout()
  }
}
