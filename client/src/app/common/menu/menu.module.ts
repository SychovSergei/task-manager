import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive } from '@angular/router';



@NgModule({
  declarations: [
    MenuComponent,
  ],
  exports: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class MenuModule { }
