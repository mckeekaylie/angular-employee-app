import { NgModule } from '@angular/core';
import { EmployeesModule } from './employees/employees.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { EmployeesRoutingModule } from './employees/employees-routing.module.ts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule, 
    EmployeesModule, 
    AppRoutingModule, 
    EmployeesRoutingModule, 
    HttpClientModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}