using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hackday.GraphQL.WebApi.Models
{
    public class Superpower
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Enter a name for the super power")]
        public string Name { get; set; }
        public string Description { get; set; }

        [ForeignKey("SuperheroId")]
        public Guid SuperheroId { get; set; }
        public Superhero Superhero { get; set; }
    }
}
