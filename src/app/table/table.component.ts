import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    // TABLE STATES //
    public category1 = true;
    public category2 = false;
    public category3 = false;
    title= 'appBootstrap';
    closeResult:string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
  

  // STORE DATA // 
  public cat1List = [
    { rollno: 'val1', name: 'val2', work: 'val3' },
    { rollno: 'val4', name: 'val5', work: 'val6' },
    { rollno: 'val7', name: 'val8', work: 'val8' }];
    public cat2List = [];
    public cat3List = [];
  
    // TOGGLES INDIVIDUAL TABLE STATE //
    toggle(id){
      switch(id){
         case 'cat1': this.category1 = !this.category1; break;
         case 'cat2': this.category2 = !this.category2; break;
         case 'cat3': this.category3 = !this.category3; break;
      }
   }
}
