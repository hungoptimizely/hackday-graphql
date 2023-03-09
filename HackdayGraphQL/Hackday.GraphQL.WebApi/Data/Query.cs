using Hackday.GraphQL.WebApi.Models;

namespace Hackday.GraphQL.WebApi.Data
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Superhero> GetSuperheroes([Service] ApplicationDbContext dbContext) =>
            dbContext.Superheroes;
    }
}
