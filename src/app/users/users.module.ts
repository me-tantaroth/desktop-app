import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBarnModule } from 'ng-barn';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '../material.module';
import { CovalentModule } from '../covalent.module';
import { LayoutsModule } from '../layouts/layouts.module';

import { UsersComponent, UserComponent, RecoveryComponent } from './pages';
import { UserListComponent, UserFormComponent, ModalUserListComponent } from './components';

@NgModule({
  declarations: [
    UserListComponent,
    UsersComponent,
    UserComponent,
    UserFormComponent,
    ModalUserListComponent,
    RecoveryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgBarnModule,
    MaterialModule,
    CovalentModule,
    LayoutsModule,
    UsersRoutingModule
  ],
  exports: [UserListComponent, UserFormComponent, ModalUserListComponent]
})
export class UsersModule {}
