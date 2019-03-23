import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, NotFoundComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'user',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
