using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Get_things_done_Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Get_things_done_Api.Controllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]

    public class MinListaController : ControllerBase

    {

        private readonly AppDbContext _context;



        public MinListaController(AppDbContext context)

        {

            _context = context;

        }



        // GET: MinLista
        [HttpGet]

        public async Task<IActionResult> Index()

        {
            var username = User.Identity.Name;

            return Ok(await _context.MinLista.Where(u => u.User == username).ToListAsync());

        }

        [HttpGet("{id}")]

        public async Task<ActionResult<MinLista>> GetMinLista(int id)

        {

            var MinLista = await _context.MinLista.FindAsync(id);



            if (MinLista == null)

            {

                return NotFound("Kunde inte hitta Lista");

            }



            return Ok(MinLista);

        }



        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateLista(int id, MinLista MinLista)

        {

            if (id != MinLista.Id)

            {

                return BadRequest("Finns inte");

            }



            var getLista = await _context.MinLista.FindAsync(id);

            if (getLista == null)

            {

                return NotFound();

            }



            getLista.Id = MinLista.Id;

            getLista.MinListaNamn = MinLista.MinListaNamn;

            getLista.Beskrivning = MinLista.Beskrivning;



            try

            {

                await _context.SaveChangesAsync();

            }

            catch

            {

                return NotFound("Kunde inte ");

            }



            return NoContent();

        }



        [HttpPost]

        public async Task<ActionResult<MinLista>> CreateUppgift(MinLista MinLista)

        {

            try

            {
                var username = User.Identity.Name;

                var newMinLista = new MinLista

                {

                   

                    //MinListaId = MinLista.MinListaId,

                    MinListaNamn = MinLista.MinListaNamn,

                    Beskrivning = MinLista.Beskrivning,

                    User = username,

                };



                _context.MinLista.Add(newMinLista);

                await _context.SaveChangesAsync();



                return Ok(newMinLista);

            }

            catch

            {

                return BadRequest("Databas fel");

            }



        }



        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteMinLista(int id)

        {

            var minLista = await _context.MinLista.FindAsync(id);

            var uppgifter = _context.Uppgifter.Where(l => l.MinLista == minLista).FirstOrDefault();

            if (minLista == null)

            {

                return NotFound("Kunde inte hitta ");

            }

            if(uppgifter != null)
            {
                _context.Uppgifter.Remove(uppgifter);
            }
            
            _context.MinLista.Remove(minLista);

            await _context.SaveChangesAsync();



            return NoContent();

        }


    }
}
