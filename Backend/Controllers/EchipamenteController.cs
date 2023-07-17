
using Gestionare.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;


namespace Gestionare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EchipamenteController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly UserManager<IdentityUser> userManager;

        public EchipamenteController(DBContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        [HttpGet("ListaEchipamente")]
        public async Task<ActionResult<IEnumerable<Echipamente>>> GetEchipamente()
        {
            var echipamente = await _context.Echipamente.ToListAsync();
            return Ok(echipamente);
        }
        [HttpGet("currentEchipament")]
        public async Task<IActionResult> GetEchipamentById(int id)
        {
            var echipament = await _context.Echipamente.FindAsync(id);

            if (echipament == null)
            {
                return NotFound("Echipamentul nu a fost găsit.");
            }

            return Ok(echipament);
        }



        [HttpPost("CreateEquipment")]
        
        public IActionResult CreateEquipment([FromBody] Echipamente model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Echipamente.Add(model);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest("Eroare la salvarea echipamentului: " + ex.Message);
            }

            return Ok("Echipamentul a fost creat cu succes.");
        }


    }
}
