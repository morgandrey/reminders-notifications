import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import { Reminder } from "./reminder";
import { PushNotificationsService } from "ng-push";


@Component({
    selector: "purchase-app",
    templateUrl: "./app.component.html",
    providers: [DataService]
})

export class AppComponent implements OnInit {
    reminder: Reminder;
    reminders: Reminder[];
    Date = { day: 10, month: 6, year: 2020 };
    Time = { hour: 12, minute: 20};
    reminderText: string;
    cookie: string;


    constructor(private dataService: DataService, private pushNotifications: PushNotificationsService) {
        setInterval(() => { this.checkForNotification(); }, 1000);
    }

    ngOnInit() {
        this.loadReminders();
    }

    checkForNotification() {
        var timeNow = new Date().toLocaleString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2").substring(0, 17);

        for (var i = 0; i < this.reminders.length; i++) {
            if (this.reminders[i].reminderDate.includes(timeNow)) {
                this.pushNotification(this.reminders[i]);
                this.delete(this.reminders[i]);
                this.loadReminders();
            }
        }
    }

    requestPermission() {
        this.pushNotifications.requestPermission();
    }

    pushNotification(reminder: Reminder) {
        this.pushNotifications.create(
            "Reminder",
            { body: reminder.reminderText }
        ).subscribe((res: { event: { type: string; }; notification: { close: () => void; }; }) => {
                if (res.event.type === "click") {
                    res.notification.close();
                }
            }
        );
    }
    loadReminders() {
        this.dataService.getReminders()
            .subscribe((data: Reminder[]) => {
                    this.reminders = data;
                    this.reminders.sort(this.compare);
                }
            );
    }

    compare(a: Reminder, b: Reminder) {
        const dateA = new Date(a.reminderDate).getDate();
        const dateB = new Date(b.reminderDate).getDate();

        let comparison = 0;
        if (dateA > dateB) {
            comparison = 1;
        } else if (dateA < dateB) {
            comparison = -1;
        }
        return comparison;
    }

    delete(r: Reminder) {
        this.dataService.deleteReminder(r.idReminder)
            .subscribe(() => this.loadReminders());
    }

    add() {
        if (this.reminderText.trim().length === 0) {
            return;
        }

        this.reminder = this.newReminder();
        this.dataService.createReminder(this.reminder)
            .subscribe((data: Reminder) => {
                this.reminders.push(data);
                this.loadReminders();
            });
    }

    newReminder(): Reminder {
        var reminderDate = this.zero(this.Date['day']) + this.Date['day'] + "."
            + this.zero(this.Date['month']) + this.Date['month'] + "."
            + this.Date['year'] + ", "
            + this.zero(this.Time['hour']) + this.Time['hour'] + ":"
            + this.zero(this.Time['minute']) + this.Time['minute'];
        return new Reminder(this.reminderText, reminderDate);
    }

    zero(num: number): string {
        if (num <= 9) {
            return "0";
        } else {
            return "";
        }
    }
}