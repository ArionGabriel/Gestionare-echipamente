using System.ComponentModel.DataAnnotations;

namespace Gestionare.Models
{
    public class CreateRole
    {
        [Required]
        [Display(Name = "Role")]
        public string RoleName { get; set; }
    }
}
