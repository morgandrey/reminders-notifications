import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { PushNotificationsModule } from "ng-push";

@NgModule({
    imports: [BrowserModule, FormsModule, NgbModule, ReactiveFormsModule, HttpClientModule, PushNotificationsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [CookieService]
})

export class AppModule { }