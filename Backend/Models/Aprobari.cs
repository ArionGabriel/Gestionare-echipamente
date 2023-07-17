using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Gestionare.Models;
using Microsoft.AspNetCore.Identity;

namespace Gestionare.Models
{
    public class Aprobari
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Descriere { get; set; }

        public bool Aprobata { get; set; }
        [MaxLength(450)]
        public string UserId { get; set; }

        [Required]
        public int SolicitareId { get; set; }

        [ForeignKey("SolicitareId")]
        public Solicitari? Solicitare { get; set; }

        [ForeignKey("UserId")]
        public IdentityUser? User { get; set; }


    }
}
