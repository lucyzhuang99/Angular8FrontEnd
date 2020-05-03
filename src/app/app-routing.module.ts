import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent} from './Schedule/schedule/schedule.component';
import { TableComponent } from './table/table.component';
//import { DisplayUsersComponent} from './display-users/display-users.component';

const routes: Routes = [
  {path: 'getschedules', component: ScheduleComponent },
  {path: 'togglesample', component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
