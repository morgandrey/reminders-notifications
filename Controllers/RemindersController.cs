using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reminders>>> Get() {
            if (Request.Cookies["idCookie"] == null) {
                Response.Cookies.Append("idCookie", CreateRandomCookie(12));
            }
            var cookie = Request.Cookies["idCookie"];
            return await dbContext.Reminders.Where(s => s.Cookie.Contains(cookie)).ToListAsync();
        }

        private static string CreateRandomCookie(int length) {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var res = new StringBuilder();
            using var rng = new RNGCryptoServiceProvider();
            var uintBuffer = new byte[sizeof(uint)];
            while (length-- > 0) {
                rng.GetBytes(uintBuffer);
                var num = BitConverter.ToUInt32(uintBuffer, 0);
                res.Append(valid[(int)(num % (uint)valid.Length)]);
            }

            return res.ToString();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reminders>> Get(int id) { 
            return await dbContext.Reminders.FirstOrDefaultAsync(x =>
                x.IdReminder == id);
        }

        [HttpPost]
        public async Task<ActionResult<Reminders>> Post([FromBody] Reminders reminder)
        {
            if (ModelState.IsValid) {
                reminder.Cookie = Request.Cookies["idCookie"];
                await dbContext.Reminders.AddAsync(reminder);
                await dbContext.SaveChangesAsync();
                return Ok(reminder);
            }
            return BadRequest(ModelState);
        }

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
