using Gestionare.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Gestionare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitariController : ControllerBase
    {
        private readonly DBContext _context;

        public SolicitariController(DBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ListaSolicitari")]
        public ActionResult<IEnumerable<Solicitari>> GetSolicitari()
        {
            var solicitari = _context.Solicitari
                .Include(s => s.Echipament)
                .Include(s => s.User)
                .ToList();

            return Ok(solicitari);
        }

        [HttpGet("currentsolicitare")]
        public ActionResult<Solicitari> GetSolicitare(int id)
        {
            var solicitare = _context.Solicitari.Find(id);
            if (solicitare == null)
            {
                return NotFound();
            }

            return solicitare;
        }


        [HttpGet]
        [Route("UserSolicitari")]
        public IActionResult GetSolicitariByUserId(string userId)
        {
            try
            {
                var solicitari = _context.Solicitari
                    .Where(s => s.UserId == userId)
                    .ToList();
                return Ok(solicitari);
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, "A apărut o eroare la obținerea solicitărilor.");
            }
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateSolicitare([FromBody] Solicitari model)
        {
            try
            {
                var echipament = await _context.Echipamente.FindAsync(model.EchipamentId);
                if (echipament == null)
                {
                    return NotFound("Echipamentul nu a fost găsit.");
                }

                var solicitare = new Solicitari
                {
                    EchipamentId = model.EchipamentId,
                    Descriere = model.Descriere,
                    UserId = model.UserId,
                    Echipament = echipament
                };

                _context.Solicitari.Add(solicitare);
                await _context.SaveChangesAsync();

                return Ok("Solicitarea a fost creată cu succes.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"A apărut o eroare: {ex.Message}");
            }
        }
    }
}
