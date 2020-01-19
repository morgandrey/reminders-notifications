using Microsoft.EntityFrameworkCore;

namespace Reminders_Notifications.Models
{
    public partial class RemindersDataContext : DbContext
    {
        public RemindersDataContext()
        {
        }

        public RemindersDataContext(DbContextOptions<RemindersDataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Reminders> Reminders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reminders>(entity =>
            {
                entity.HasKey(e => e.IdReminder);

                entity.Property(e => e.IdReminder)
                    .HasColumnName("id_reminder")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Cookie)
                    .IsRequired()
                    .HasColumnName("cookie");

                entity.Property(e => e.ReminderDate)
                    .IsRequired()
                    .HasColumnName("reminder_date");

                entity.Property(e => e.ReminderText)
                    .IsRequired()
                    .HasColumnName("reminder_text");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
