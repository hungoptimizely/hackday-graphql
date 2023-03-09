using Hackday.GraphQL.WebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hackday.GraphQL.WebApi.Data.ContextConfigurations
{
    public class SuperpowerContextConfiguration : IEntityTypeConfiguration<Superpower>
    {
        private Guid[] _ids;
        public SuperpowerContextConfiguration(Guid[] ids)
        {
            _ids = ids;
        }
        public void Configure(EntityTypeBuilder<Superpower> builder)
        {
            builder
                .HasData(
                new Superpower
                {
                    Id = Guid.NewGuid(),
                    Name = "Intellect.",
                    Description = "He's always a step ahead.",
                    SuperheroId = _ids[0]
                },
                new Superpower
                {
                    Id = Guid.NewGuid(),
                    Name = "Fighting",
                    Description = "Sublime fighting skills.",
                    SuperheroId = _ids[0]
                },
                new Superpower
                {
                    Id = Guid.NewGuid(),
                    Name = "Wealth.",
                    Description = "He got a lot of money",
                    SuperheroId = _ids[0]
                },
                new Superpower
                {
                    Id = Guid.NewGuid(),
                    Name = "Deflect blaster power.",
                    Description = "Skywalker is able to deflect fire from a blaster back at the opponent firing. This enables Luke to turn someone else's weapon against them.",
                    SuperheroId = _ids[1]
                },
                new Superpower
                {
                    Id = Guid.NewGuid(),
                    Name = "Espionage",
                    Description = "She's good at spying at people.",
                    SuperheroId = _ids[2]
                },
                new Superpower
                {
                    Id = Guid.NewGuid(),
                    Name = "Infiltration",
                    Description = "She knows how to infiltrate the enemy.",
                    SuperheroId = _ids[2]
                },
                new Superpower
                {
                    Id = Guid.NewGuid(),
                    Name = "Subterfuge",
                    Description = "The knowledge of how to undermine others.",
                    SuperheroId = _ids[2]
                });
        }
    }
}
