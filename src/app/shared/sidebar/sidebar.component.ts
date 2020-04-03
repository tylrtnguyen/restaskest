import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userRole: string;
  isManager = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole()
    this.isManager = this.userRole === 'manager' ? true : false;
  }

}
