import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button/login-button.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    LoginButtonComponent,
    TopMenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule, 
    MatMenuModule,
    MatToolbarModule
  ],
  exports: [
    LoginButtonComponent,
    TopMenuComponent
  ]
})
export class ComponentsModule { }
