using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Reminders_Notifications.Models;

namespace Reminders_Notifications.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RemindersController : ControllerBase {

        private readonly RemindersDataContext dbContext;

        public RemindersController(RemindersDataContext dbContext) {
            this.dbContext = dbContext;
        }

        // GET: api/Reminders
        [HttpGet]
        public IEnumerable<Reminders> Get() {
            return dbContext.Reminders.ToList();
        }

        // GET: api/Reminders/5
        [HttpGet("{id}")]
        public Reminders Get(int id) {
            var reminder = dbContext.Reminders.FirstOrDefault(x => x.IdReminder == id);
            return reminder;
        }

        // POST: api/Reminders
        [HttpPost]
        public async Task<ActionResult<Reminders>> Post([FromBody] Reminders reminder)
        {
            if (ModelState.IsValid) {
                await dbContext.Reminders.AddAsync(reminder);
                await dbContext.SaveChangesAsync();
                return Ok(reminder);
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/Reminders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Reminders>> Delete(int id)
        {
            var reminder = dbContext.Reminders.FirstOrDefault(x => x.IdReminder == id);
            if (reminder != null) { 
                dbContext.Reminders.Remove(reminder);
                await dbContext.SaveChangesAsync();
            }
            return Ok(reminder);
        }
    }
}
