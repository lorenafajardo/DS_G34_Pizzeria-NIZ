import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './master/nav-menu/nav-menu.component';
import { FooterComponent } from './master/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RemoveProductComponent } from './moduls/administration/product/remove-product/remove-product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
