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

    public class GuestUppgifterController : ControllerBase

    {

        private readonly AppDbContext _context;

        public GuestUppgifterController(AppDbContext context)

        {

            _context = context;

        }

        // GET: Uppgifter

        [HttpGet("{MinListaId}")]

        public async Task<IActionResult> GetUppgifter(int MinListaId)

        {

            try {

                var Uppgifter = await _context.Uppgifter.Where(u => u.MinListaId == MinListaId).ToListAsync();

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

    }
}















