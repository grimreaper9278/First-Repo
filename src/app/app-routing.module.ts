import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfilerComponent } from './profiler/profiler.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { TreeComponent } from './tree/tree.component';
import { PipesComponent } from './pipes/pipes.component';

const routes: Routes = [
  {
    path: 'form',
    component: ProfileFormComponent,
    title: 'home page'
  },
  {
    path: 'form/:id',
    component: ProfileFormComponent,
    title: 'home page'
  },
  {
    path: 'list',
    component: TreeComponent,
    title: 'Tree List'
  },
  {
    path: 'pipe',
    component: PipesComponent,
    title: 'Pipes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
