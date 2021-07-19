using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Get_things_done_Api.Models
{
	
	public class MinLista
	{
		[Key]
		public int Id { get; set; }
		public string MinListaNamn { get; set; }
		public string Beskrivning { get; set; }
		public string User { get; set; }
		public ICollection<Uppgifter> Uppgifter { get; set; }
		public ICollection<Guestuser> Guestusers { get; set; }

	}
}
