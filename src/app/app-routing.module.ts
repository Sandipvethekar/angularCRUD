import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'registerlist', component: RegistrationListComponent },
  { path: 'details/:id', component: UserDetailsComponent },
  { path: 'update/:id', component: RegistrationComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
