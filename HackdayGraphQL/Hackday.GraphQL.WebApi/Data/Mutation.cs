using Hackday.GraphQL.WebApi.Models;
using HotChocolate;
using Microsoft.AspNetCore.Mvc;
using static Hackday.GraphQL.WebApi.Data.Mutation;

namespace Hackday.GraphQL.WebApi.Data
{
    public class Mutation
    {
        public abstract class SuperheroRequest
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public double Height { get; set; }
            
        }
        public abstract class SuperpowerRequest
        {
            public string Name { get; set; }
            public string Description { get; set; }
        }
        public abstract class MovieRequest
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public string Instructor { get; set; }
            public DateTime ReleaseDate { get; set; }
        }

        public class SuperheroAdd : SuperheroRequest
        {
            public ICollection<SuperpowerAdd> Superpowers { get; set; }
            public ICollection<MovieAdd> Movies { get; set; }
        }
        public class SuperpowerAdd : SuperpowerRequest
        {
           
        }
        public class MovieAdd : MovieRequest
        {
            
        }

        public class SuperheroUpdate : SuperheroRequest
        {
            public Guid Id { get; set; }
            public ICollection<SuperpowerUpdate> Superpowers { get; set; }
            public ICollection<MovieUpdate> Movies { get; set; }
        }
        public class SuperpowerUpdate : SuperpowerRequest
        {
            public Guid Id { get; set; }
        }
        public class MovieUpdate : MovieRequest
        {
            public Guid Id { get; set; }
        }

        public async Task<Superhero> AddSuperhero([Service] ApplicationDbContext dbContext, SuperheroAdd superheroAdd)
        {
            var superhero = new Superhero
            {
                Id = Guid.NewGuid(),
                Name = superheroAdd.Name,
                Description = superheroAdd.Description
            };
            
            dbContext.Superheroes.Add(superhero);
            foreach(var sp in superheroAdd.Superpowers)
            {
                var superpower = new Superpower
                {
                    Id = Guid.NewGuid(),
                    SuperheroId = superhero.Id,
                    Name = sp.Name,
                    Description = sp.Description
                };
                
                dbContext.Superpowers.Add(superpower);
            }
            foreach (var m in superheroAdd.Movies)
            {
                var movie = new Movie
                {
                    Id = Guid.NewGuid(),
                    SuperheroId = superhero.Id,
                    Title = m.Title,
                    Description = m.Description,
                    Instructor = m.Instructor,
                    ReleaseDate = m.ReleaseDate,
                };
               
                dbContext.Movies.Add(movie);
            }
            await dbContext.SaveChangesAsync();
            return superhero;
        }

        public async Task<Superhero> UpdateSuperhero([Service] ApplicationDbContext dbContext, SuperheroUpdate superheroUpdate)
        {
            //dbContext.Superheroes.Update
            var superhero = new Superhero
            {
                Id = superheroUpdate.Id,
                Name = superheroUpdate.Name,
                Description = superheroUpdate.Description,
            };
            dbContext.Superheroes.Update(superhero);
            foreach (var sp in superheroUpdate.Superpowers)
            {
                var superpower = new Superpower
                {
                    Id = sp.Id,
                    SuperheroId = superhero.Id,
                    Name = sp.Name,
                    Description = sp.Description
                };

                dbContext.Superpowers.Update(superpower);
            }
            foreach (var m in superheroUpdate.Movies)
            {
                var movie = new Movie
                {
                    Id = m.Id,
                    SuperheroId = superhero.Id,
                    Title = m.Title,
                    Description = m.Description,
                    Instructor = m.Instructor,
                    ReleaseDate = m.ReleaseDate,
                };

                dbContext.Movies.Update(movie);
            }
            await dbContext.SaveChangesAsync();
            return superhero;
        }

        public async Task<Guid> RemoveSuperhero([Service] ApplicationDbContext dbContext, Guid superheroId)
        {
            var superhero = dbContext.Superheroes.FirstOrDefault(sh => sh.Id == superheroId);
            if (superhero != null)
            {
                var superpowers = dbContext.Superpowers.Where(sp => sp.SuperheroId == superheroId).ToList();
                dbContext.RemoveRange(superpowers);

                var movies = dbContext.Movies.Where(m => m.SuperheroId == superheroId).ToList();
                dbContext.RemoveRange(movies);

                dbContext.Remove(superhero);
                await dbContext.SaveChangesAsync();
            }    
            return superheroId;
        }
    }
}
