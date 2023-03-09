using Hackday.GraphQL.WebApi.Data;
using Hackday.GraphQL.WebApi.Interfaces;

namespace Hackday.GraphQL.WebApi.Repositories
{
    public class SuperpowerRepository : ISuperpowerRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public SuperpowerRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
