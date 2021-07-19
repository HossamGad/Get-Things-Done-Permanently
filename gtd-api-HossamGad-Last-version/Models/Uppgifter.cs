using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Get_things_done_Api.Models
{
	public class Uppgifter
	{
		[Key]
		public int UppgiftId { get; set; }
		public string UppgiftNamn { get; set; }
		public string Text { get; set; }
		public bool Utford { get; set;}
		public string Tag { get; set; }

		public int MinListaId { get; set; }
		public MinLista MinLista { get; set; }
	}
}
