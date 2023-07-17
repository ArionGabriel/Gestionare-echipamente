using Gestionare.Migrations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Gestionare.Models
{
    public class Solicitari
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int EchipamentId { get; set; }
        public string Descriere { get; set; }

        [MaxLength(450)]
        public string UserId { get; set; }

        [ForeignKey("EchipamentId")]
        public Echipamente? Echipament { get; set; }

        [ForeignKey("UserId")]
        public IdentityUser? User { get; set; }
    }
}
