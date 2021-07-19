using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Get_things_done_Api.Models
{
	
	public class Guestuser
	{
		[Key]
		public int GuestuserId { get; set; }
        
		[Required]
        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public int MinListaId { get; set; }
        
		public MinLista MinLista { get; set; }
	}
}
