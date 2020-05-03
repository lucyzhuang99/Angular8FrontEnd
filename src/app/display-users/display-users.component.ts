import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {

  constructor(private apiservices: ApiService) { }

  displayUserList: any = [];

  ngOnInit(): void {
    this.GetDisplayUsers();
  }


  GetDisplayUsers() {
    this.apiservices.getScheduleRestApi('users').subscribe(
      data => {
         this.displayUserList = data;
         console.log(this.displayUserList );
      }
    );
  }

}
