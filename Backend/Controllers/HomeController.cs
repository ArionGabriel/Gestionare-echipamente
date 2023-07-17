using Microsoft.AspNetCore.Mvc;

namespace Gestionare.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Ok("Merge home");
        }
    }
}
