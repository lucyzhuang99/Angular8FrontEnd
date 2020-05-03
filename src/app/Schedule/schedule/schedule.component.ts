import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy  {

  constructor(private apiservices: ApiService, private modalService: NgbModal) { }

  //scheduleList: any = [];
  workScheduleList: any = [];
  allWorkScheduleList: any = [];
  workScheduleByMeetingIdList: any[][];

  userList: any = [];
  allUserScheduleList: any = [];
  userScheduleByUserIdList: any[][];

  public attendeeShow : boolean[] = [false];
  public scheduleShow : boolean[] = [false];

 // title= 'appBootstrap';
  closeResult:string;

  ngOnInit(): void {
   // this.GetSchedules();
    this.GetWorkSchedules();
    this.GetBusinessSchedules();

    this.GetUsers();
    this.GetAllUserSchedules();
  }

  GetWorkSchedules() {
    this.apiservices.getScheduleRestApi('Schedules/workschedules').subscribe(
      data => {
        this.workScheduleList = data;
        console.log(this.workScheduleList);
      }
    );
  }

  GetBusinessSchedules() {
    this.apiservices.getScheduleRestApi('schedules/businessschedules').subscribe(
      data => {
        this.allWorkScheduleList = data;
        console.log(this.allWorkScheduleList);

        if (this.workScheduleList.length>0) {
          this.workScheduleByMeetingIdList = [];
          for (let i=0; i < this.workScheduleList.length; i++){  
            this.workScheduleByMeetingIdList[i] = [];
            let k = 0;
            for( let j = 0; j < this.allWorkScheduleList.length; j++) {                   
              if (this.allWorkScheduleList[j].ScheduleId == this.workScheduleList[i].Id){   
                this.workScheduleByMeetingIdList[i][k] = [];               
                this.workScheduleByMeetingIdList[i][k] = this.allWorkScheduleList[j];  
                k++;              
              }
            }
          }
          console.log(this.workScheduleByMeetingIdList);
        }
      }
    );
  }

  GetUsers() {
    this.apiservices.getScheduleRestApi('users').subscribe(
      data => {
        this.userList = data;
        console.log(this.userList);
        console.log("user length: " + this.userList.length);
      }
    );
  }

  GetAllUserSchedules() {
    this.apiservices.getScheduleRestApi('users/alluserschedules').subscribe(
      data => {
        this.allUserScheduleList = data;
        console.log(this.allUserScheduleList);

        if (this.userList.length>0) {
          this.userScheduleByUserIdList = [];
          for (let i=0; i < this.userList.length; i++){  
            this.userScheduleByUserIdList[i] = [];
             for( let j = 0; j < this.allUserScheduleList.length; j++) {  
              this.userScheduleByUserIdList[i][j] = [];            
               if (this.allUserScheduleList[j].UserId == this.userList[i].Id){               
                 this.userScheduleByUserIdList[i][j] = this.allUserScheduleList[j];                    
               }
             }
          }
      
          console.log(this.userScheduleByUserIdList);
        }
      }
    );
  }

  // TOGGLES INDIVIDUAL TABLE STATE //
  ToggleAreaAttendee(id){   

      for (let index = 0; index < this.workScheduleList.length; index++) {
        if (id == this.workScheduleList[index].Id)
        {
          this.attendeeShow[index] = !this.attendeeShow[index];
          break;
        }      
      }
  
    }

  ToggleArea(id){    

    for (let index = 0; index < this.userList.length; index++) {
      if (id == this.userList[index].Id)
      {
        this.scheduleShow[index] = !this.scheduleShow[index];
        break;
      }      
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public ngOnDestroy(): void {
    this.workScheduleList.unsubscribe();
    this.allWorkScheduleList.unsubscribe();
    this.userList.unsubscribe();
    this.allUserScheduleList.unsubscribe();
  }

}
