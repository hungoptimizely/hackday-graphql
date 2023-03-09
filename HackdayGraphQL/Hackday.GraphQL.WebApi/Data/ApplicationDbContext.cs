using Hackday.GraphQL.WebApi.Data.ContextConfigurations;
using Hackday.GraphQL.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace Hackday.GraphQL.WebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            var ids = new Guid[] { Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid() };

            builder.ApplyConfiguration(new SuperheroContextConfiguration(ids));
            builder.ApplyConfiguration(new SuperpowerContextConfiguration(ids));
            builder.ApplyConfiguration(new MovieContextConfiguration(ids));
        }

        public DbSet<Superhero> Superheroes { get; set; }
        public DbSet<Superpower> Superpowers { get; set; }
        public DbSet<Movie> Movies { get; set; }
    }
}
