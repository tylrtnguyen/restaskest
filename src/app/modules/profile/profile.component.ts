import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service'
import { NotificationService } from '../../services/notification.service';



interface Restaurant {
  id: number;
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public managerService: ManagerService,
              private notificationService: NotificationService) { }
  manager: object;

  ngOnInit(): void {
    this.managerService.getManager().subscribe(res => {
      this.managerService.populateForm(res['data'])
    })
  }

  restaurants: Restaurant[]  = [
    { id: 1, name: 'Queen Magherita' },
    { id: 2, name: 'Chew & Chill' },
    { id: 3, name: 'JOEY'},
    { id: 4, name: 'The Keg'}];

    onSubmit(){
      this.managerService.updateManager(this.managerService.formControl.value).subscribe(response => {
        if(response){
          this.notificationService.success('Congrats! Employee updated successfully!!');
        }
      }, error => {
        console.log(error);
      })
    }

    onClear(){
      this.managerService.formControl.reset();
      this.managerService.initializeFormGroup();
    }

}
