namespace Reminders_Notifications.Models
{
    public partial class Reminders
    {
        public long IdReminder { get; set; }
        public string ReminderText { get; set; }
        public string ReminderDate { get; set; }
        public string Cookie { get; set; }
    }
}
