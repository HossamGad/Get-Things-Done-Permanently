using System;

using System.Collections.Generic;

using System.Linq;

using System.Security.Claims;

using System.Threading.Tasks;

using Get_things_done_Api.Models;
using Microsoft.AspNetCore.Authentication;

using Microsoft.AspNetCore.Authentication.Cookies;

using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Mvc.ModelBinding;

using Microsoft.AspNetCore.Authorization;

namespace Get_things_done_Api.Controllers

{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]

    [Route("api/[controller]")]

    [ApiController]

    public class UsersController : ControllerBase

    {

        private readonly SignInManager<IdentityUser> signInManager;

        private readonly UserManager<IdentityUser> userManager;



        public UsersController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)

        {

            this.signInManager = signInManager;

            this.userManager = userManager;

        }
        
        [HttpGet]
        public IActionResult GetAllUsersAsync()

        {
            var users = userManager.Users.ToList();
            
                return Ok(users);
        }   

    }

}