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
import { PushNotificationsService } from "ng-push";
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService, pushNotifications) {
        var _this = this;
        this.dataService = dataService;
        this.pushNotifications = pushNotifications;
        this.Date = { day: 30, month: 1, year: 2020 };
        this.Time = { hour: 17, minute: 20 };
        setInterval(function () { _this.checkForNotification(); }, 1000);
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadReminders();
    };
    AppComponent.prototype.checkForNotification = function () {
        var timeNow = new Date().toLocaleString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2").substring(0, 17);
        for (var i = 0; i < this.reminders.length; i++) {
            if (this.reminders[i].reminderDate.includes(timeNow)) {
                this.pushNotification(this.reminders[i]);
                this.delete(this.reminders[i]);
                this.loadReminders();
            }
        }
    };
    AppComponent.prototype.requestPermission = function () {
        this.pushNotifications.requestPermission();
    };
    AppComponent.prototype.pushNotification = function (reminder) {
        this.pushNotifications.create("Reminder", { body: reminder.reminderText })
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
            .subscribe(function (data) {
            _this.reminders = data;
            _this.reminders.sort(_this.compare);
        });
    };
    AppComponent.prototype.compare = function (a, b) {
        var dateA = new Date(a.reminderDate).getDate();
        var dateB = new Date(b.reminderDate).getDate();
        var comparison = 0;
        if (dateA > dateB) {
            comparison = 1;
        }
        else if (dateA < dateB) {
            comparison = -1;
        }
        return comparison;
    };
    AppComponent.prototype.delete = function (r) {
        var _this = this;
        this.dataService.deleteReminder(r.idReminder)
            .subscribe(function () { return _this.loadReminders(); });
    };
    AppComponent.prototype.add = function () {
        var _this = this;
        if (this.reminderText.trim().length === 0) {
            return;
        }
        this.reminder = this.newReminder();
        this.dataService.createReminder(this.reminder)
            .subscribe(function (data) {
            _this.reminders.push(data);
            _this.loadReminders();
        });
    };
    AppComponent.prototype.newReminder = function () {
        var reminderDate = this.zero(this.Date['day']) + this.Date['day'] + "."
            + this.zero(this.Date['month']) + this.Date['month'] + "."
            + this.Date['year'] + ", "
            + this.zero(this.Time['hour']) + this.Time['hour'] + ":"
            + this.zero(this.Time['minute']) + this.Time['minute'];
        return new Reminder(this.reminderText, reminderDate);
    };
    AppComponent.prototype.zero = function (num) {
        if (num <= 9) {
            return "0";
        }
        else {
            return "";
        }
    };
    AppComponent = __decorate([
        Component({
            selector: "purchase-app",
            templateUrl: "./app.component.html",
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService, PushNotificationsService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map