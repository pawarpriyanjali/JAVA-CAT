import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from '../router/user-routing.module';
import { UserComponents } from '../component/user.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [UserComponents]
})
export class UserModule { }
