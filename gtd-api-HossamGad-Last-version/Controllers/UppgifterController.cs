using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Get_things_done_Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Get_things_done_Api.Controllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]

    [ApiController]

    public class UppgifterController : ControllerBase

    {

        private readonly AppDbContext _context;



        public UppgifterController(AppDbContext context)

        {

            _context = context;

        }



        // GET: Uppgifter

        [HttpGet]

        public async Task<IActionResult> GetUppgifter(int MinListaId)

        {

            try {

                var username = User.Identity.Name;

                var Uppgifter = await _context.Uppgifter.Include(m => m.MinLista).Where(u => u.MinLista.User == username).ToListAsync();
                
                if(Uppgifter == null)

                {

                    return NotFound("Kunde inte hitta Uppgifter");

                }



                return Ok(Uppgifter);

            } 

            catch 

            {

                return NotFound("Kunde inte hitta Uppgifter");

            }   

        }



        [HttpGet("{UppgiftId}")]

        public async Task<ActionResult<Uppgifter>> GetUppgift(int UppgiftId)

        {

            var Uppgifter = await _context.Uppgifter.FindAsync(UppgiftId);



            if (Uppgifter == null)

            {

                return NotFound("Kunde inte hitta ");

            }



            return Ok(Uppgifter);

        }

        


        [HttpPut("{UppgiftId}")]

        public async Task<IActionResult> UpdateUppgift(int UppgiftId, Uppgifter Uppgifter)

        {

            if (UppgiftId != Uppgifter.UppgiftId)

            {

                return BadRequest("finns inte");

            }



            var getUppgifter= await _context.Uppgifter.FindAsync(UppgiftId);

            if (getUppgifter == null)

            {

                return NotFound();

            }

                getUppgifter.UppgiftId = Uppgifter.UppgiftId;

                getUppgifter.UppgiftNamn = Uppgifter.UppgiftNamn;

                getUppgifter.Text = Uppgifter.Text;

                getUppgifter.MinListaId = Uppgifter.MinListaId;

                getUppgifter.Tag = Uppgifter.Tag;

            try

            {

                await _context.SaveChangesAsync();

            }

            catch 

            {

                return NotFound("Kunde inte uppdatera uppgift");

            }



            return NoContent();

        }

        [HttpPost]

        public async Task<ActionResult<Uppgifter>> CreateUppgifter(Uppgifter Uppgifter)

        {

            try {

                var newUppgift = new Uppgifter

                {

                    UppgiftNamn = Uppgifter.UppgiftNamn,

                    Text = Uppgifter.Text,

                    MinListaId = Uppgifter.MinListaId,

                    Tag = Uppgifter.Tag

                };



                _context.Uppgifter.Add(newUppgift);

                await _context.SaveChangesAsync();



                return Ok(newUppgift);

            }

            catch

            {

                return BadRequest("Databas fel");

            }

            

        }



        [HttpDelete("{UppgiftId}")]

        public async Task<IActionResult> DeleteUppgifter(int UppgiftId)

        {

            var Uppgifter = await _context.Uppgifter.FindAsync(UppgiftId);



            if (Uppgifter == null)

            {

                return NotFound("Kunde inte hitta uppgift");

            }



            _context.Uppgifter.Remove(Uppgifter);

            await _context.SaveChangesAsync();



            return NoContent();

        }

    }
}
