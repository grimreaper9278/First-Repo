import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfilerComponent } from './profiler/profiler.component';
import { TreeComponent } from './tree/tree.component';
import { NumFormatPipe } from './num-format.pipe';
import { PipesComponent } from './pipes/pipes.component';
import { NumFontPipe } from './num-font.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProfileFormComponent,
    ProfilerComponent,
    TreeComponent,
    NumFormatPipe,
    PipesComponent,
    NumFontPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProfilerComponent, ProfileFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
