export class Reminder {
    idReminder?: number;
    reminderText: string;
    reminderDate: string;

    constructor(reminderText: string, reminderDate: string, idReminder?: number) {
        this.idReminder = idReminder;
        this.reminderText = reminderText;
        this.reminderDate = reminderDate;
    }
}