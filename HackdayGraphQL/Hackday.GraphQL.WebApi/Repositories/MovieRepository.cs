using Hackday.GraphQL.WebApi.Data;
using Hackday.GraphQL.WebApi.Interfaces;

namespace Hackday.GraphQL.WebApi.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public MovieRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
