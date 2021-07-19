using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Get_things_done_Api.Models;
using Microsoft.EntityFrameworkCore;


namespace Get_things_done_Api.Controllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]

    public class GuestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GuestController(AppDbContext context)
        {

            _context = context;

        }

        // GET: MinLista
        [HttpGet]
        public async Task<IActionResult> Index()

        {
            var username = User.Identity.Name;

            var guestLists = await _context.MinLista.Include(g => g.Guestusers).ToListAsync();

            List<Guestuser> listuser = new List<Guestuser>();

            foreach(MinLista lista in guestLists) {

                var ny = lista.Guestusers.FirstOrDefault(u => u.UserName == username);

                listuser.Add(ny);
                
            }

            return Ok(listuser);

        }

        [HttpPost]
        public async Task<ActionResult<Guestuser>> CreateGuest(Guestuser guestuser)
        {
            try
            {
                var username = User.Identity.Name;
                var newGuest = new Guestuser
                {
                    UserName = guestuser.UserName,
                    Email = guestuser.Email,
                    MinListaId = guestuser.MinListaId,
                };
                _context.Guestuser.Add(newGuest);
                await _context.SaveChangesAsync();
                return Ok(newGuest);
            }
            catch
            {
                return BadRequest("Databas fel");
            }
        }

    }
    
}
