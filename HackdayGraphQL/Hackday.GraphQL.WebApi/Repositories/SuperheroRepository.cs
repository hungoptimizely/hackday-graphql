using Hackday.GraphQL.WebApi.Data;
using Hackday.GraphQL.WebApi.Interfaces;

namespace Hackday.GraphQL.WebApi.Repositories
{
    public class SuperheroRepository : ISuperheroRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public SuperheroRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
