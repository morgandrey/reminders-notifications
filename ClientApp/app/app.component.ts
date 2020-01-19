import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import { Reminder } from "./reminder";
import { CookieService } from "ngx-cookie-service";
import { PushNotificationsService } from "ng-push";


@Component({
    selector: "purchase-app",
    templateUrl: "./app.component.html",
    providers: [DataService]
})

export class AppComponent implements OnInit {
    reminder: Reminder;
    reminders: Reminder[];
    date = { day: "3", month: "1", year: "2020" };
    time = { hour: "20", minute: "15" };
    body: string;
    cookie: string;


    constructor(private dataService: DataService, private cookieService: CookieService, private pushNotifications: PushNotificationsService) {

    }

    ngOnInit() {
        this.loadReminders();
        this.check();
    }

    check() {
        var timeNow = new Date();
        console.log(timeNow.toLocaleString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2").substring(0, 17));
    }

    requestPermission() {
        this.pushNotifications.requestPermission();
    }

    pushNotification() {
        this.pushNotifications.create(
            "Example One",
            { body: "Just an example" }
        )
            .subscribe((res: { event: { type: string; }; notification: { close: () => void; }; }) => {
                if (res.event.type === "click") {
                    // You can do anything else here
                    res.notification.close();
                }
            }
        );
    }
    loadReminders() {
        this.dataService.getReminders()
            .subscribe((data: Reminder[]) => this.reminders = data);
    }

    delete(r: Reminder) {
        this.dataService.deleteReminder(r.idReminder)
            .subscribe(() => this.loadReminders());
    }

    add() {
        this.reminder = this.newReminder();
        this.dataService.createReminder(this.reminder)
            .subscribe((data: Reminder) => this.reminders.push(data));
        this.loadReminders();
    }

    newReminder(): Reminder {
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
    }
}