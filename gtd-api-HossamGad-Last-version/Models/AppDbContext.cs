using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Get_things_done_Api.Models
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {


        }

        public DbSet<Uppgifter> Uppgifter { get; set; }
        public DbSet<MinLista> MinLista { get; set; }
        public DbSet<Guestuser> Guestuser { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //seed categories
            modelBuilder.Entity<MinLista>().HasData(new MinLista { Id = 1, MinListaNamn = "Idag", Beskrivning ="Tvätta bilen", User = "Mats" });
            modelBuilder.Entity<MinLista>().HasData(new MinLista { Id = 2, MinListaNamn = "Imorgon", Beskrivning ="Träna", User = "TestUser"});
            modelBuilder.Entity<MinLista>().HasData(new MinLista { Id = 3, MinListaNamn = "Nästa Vecka", Beskrivning ="Läsa böker", User = "TestUser" });


            modelBuilder.Entity<Uppgifter>().HasData(new 
            {
                UppgiftId = 1,
                UppgiftNamn = "Idag",
                Text = "Uppgifter som ska görs idag",
                Utford = true,
                MinListaId = 1,
                Tag = "#Varm dag"
            });

            modelBuilder.Entity<Uppgifter>().HasData(new 
            {
                UppgiftId = 2,
                UppgiftNamn = "Imorgon",
                Text = "Uppgifter som ska görs imorgon",
                Utford = true,
                MinListaId = 2,
                Tag = "#Soligt dag"
            });
            modelBuilder.Entity<Uppgifter>().HasData(new 
            {
                UppgiftId = 3,
                UppgiftNamn = "Nästa Vecka",
                Text = "Uppgifter som ska görs nästa vecka",
                Utford = false,
                MinListaId = 3,
                Tag = "#fint väder"
            });

            modelBuilder.Entity<Guestuser>().HasData(new Guestuser 
                { 
                    GuestuserId = 1,
                    UserName = "Linus",
                    Password = "Linus1234?",
                    Email = "linus@mail.com",
                    MinListaId = 2
                });
        }
    }
}
