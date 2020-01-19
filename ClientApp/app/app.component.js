var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { DataService } from "./data.service";
import { Reminder } from "./reminder";
import { CookieService } from "ngx-cookie-service";
import { PushNotificationsService } from "ng-push";
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService, cookieService, pushNotifications) {
        this.dataService = dataService;
        this.cookieService = cookieService;
        this.pushNotifications = pushNotifications;
        this.date = { day: "3", month: "1", year: "2020" };
        this.time = { hour: "20", minute: "15" };
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadReminders();
        this.check();
    };
    AppComponent.prototype.check = function () {
        var timeNow = new Date();
        console.log(timeNow.toLocaleString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2").substring(0, 17));
    };
    AppComponent.prototype.requestPermission = function () {
        this.pushNotifications.requestPermission();
    };
    AppComponent.prototype.pushNotification = function () {
        this.pushNotifications.create("Example One", { body: "Just an example" })
            .subscribe(function (res) {
            if (res.event.type === "click") {
                // You can do anything else here
                res.notification.close();
            }
        });
    };
    AppComponent.prototype.loadReminders = function () {
        var _this = this;
        this.dataService.getReminders()
            .subscribe(function (data) { return _this.reminders = data; });
    };
    AppComponent.prototype.delete = function (r) {
        var _this = this;
        this.dataService.deleteReminder(r.idReminder)
            .subscribe(function () { return _this.loadReminders(); });
    };
    AppComponent.prototype.add = function () {
        var _this = this;
        this.reminder = this.newReminder();
        this.dataService.createReminder(this.reminder)
            .subscribe(function (data) { return _this.reminders.push(data); });
        this.loadReminders();
    };
    AppComponent.prototype.newReminder = function () {
        if (+(this.date["day"]) <= 9) {
            this.date["day"] = "0" + this.date["day"];
        }
        if (+(this.date["month"]) <= 9) {
            this.date["month"] = "0" + this.date["month"];
        }
        if (+(this.time["hour"]) <= 9) {
            this.time["hour"] = "0" + this.time["hour"];
        }
        if (+(this.time["minute"]) <= 9) {
            this.time["minute"] = "0" + this.time["minute"];
        }
        var timeToWork = this.date["day"] + "." + this.date["month"] + "." + this.date["year"] + ", "
            + this.time["hour"] + ":" + this.time["minute"];
        return new Reminder(this.body, timeToWork);
    };
    AppComponent = __decorate([
        Component({
            selector: "purchase-app",
            templateUrl: "./app.component.html",
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService, CookieService, PushNotificationsService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map