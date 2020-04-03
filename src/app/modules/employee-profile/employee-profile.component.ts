import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { EmployeeService } from "src/app/services/employee.service";

interface Department {
  id: number;
  name: string;
}

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.css"]
})
export class EmployeeProfileComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    private notificationService: NotificationService
  ) {}

  departments: Department[] = [
    { id: 1, name: "FOH" },
    { id: 2, name: "BOH" },
    { id: 3, name: "Host" },
    { id: 4, name: "Management" }
  ];

  ngOnInit(): void {
    this.service.getOneEmployee().subscribe(res => {
      let { __v, ...employee } = res["data"];
      this.service.populateForm(employee);
    });
  }

  onSubmit() {
    this.service.updateEmployee(this.service.formControl.value).subscribe(
      response => {
        if (response) {
          this.notificationService.success(
            "Congrats! Employee updated successfully!!"
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onClear() {
    this.service.formControl.reset();
    this.service.initializeFormGroup();
  }
}
