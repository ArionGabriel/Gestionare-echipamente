using System.ComponentModel.DataAnnotations;

namespace Gestionare.Models
{
    public class AssignRole
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string RoleName { get; set; }
    }
}
