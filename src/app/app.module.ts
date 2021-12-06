import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NvMenuComponent } from './components/nv-menu/nv-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './public/general/home/home.component';
import { NotFoundComponent } from './public/general/not-found/not-found.component';
import { SendgridEmailComponent } from './components/sendgrid-email/sendgrid-email.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NvMenuComponent,
    FooterComponent,
    FormComponent,
    HomeComponent,
    NotFoundComponent,
    SendgridEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
