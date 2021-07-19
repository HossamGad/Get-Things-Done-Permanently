using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Get_things_done_Api.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Get_things_done_Api.Controllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]

    [ApiController]

    public class TagsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TagsController(AppDbContext context)

        {

            _context = context;

        }

        // GET: Uppgifter

        [HttpGet]

        public async Task<IActionResult> GetUppgifter(int MinListaId)

        {

            try
            {

                var username = User.Identity.Name;

                var Uppgifter = await _context.Uppgifter.Include(m => m.MinLista).Where(u => u.MinLista.User == username).ToListAsync();

                if (Uppgifter == null)

                {

                    return NotFound("Kunde inte hitta Uppgifter");

                }



                return Ok(Uppgifter);

            }

            catch

            {

                return NotFound("Kunde inte hitta uppgiften");

            }

        }

        [HttpGet("{Tag}")]

        public async Task<ActionResult<Uppgifter>> GetUppgiftMedTag(string Tag)

        {
            var tag = "#" + Tag;

            var username = User.Identity.Name;

            var Uppgifter = await _context.Uppgifter.Where(u => u.Tag == tag && u.MinLista.User == username).ToListAsync();

            if (Uppgifter == null)

            {

                return NotFound("Kunde inte hitta ");

            }

            return Ok(Uppgifter);

        }

    }
}
