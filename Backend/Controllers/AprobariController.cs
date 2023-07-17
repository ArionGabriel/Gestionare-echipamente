using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Gestionare.Models;
using Microsoft.EntityFrameworkCore;


namespace Gestionare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AprobariController : ControllerBase
    {
        private readonly DBContext _context;

        public AprobariController(DBContext context)
        {
            _context = context;
        }

        [HttpPut]
        [Route("UpdateAprobare")]
        public async Task<IActionResult> UpdateAprobare(int id, Aprobari aprobare)
        {
            try
            {
                var existingAprobare = await _context.Aprobari.FindAsync(id);

                if (existingAprobare == null)
                {
                    return NotFound();
                }

                existingAprobare.Descriere = aprobare.Descriere;
                existingAprobare.Aprobata = aprobare.Aprobata;

                _context.Aprobari.Update(existingAprobare);
                await _context.SaveChangesAsync();

                return Ok(existingAprobare);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"A apărut o eroare: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("ListaAprobari")]
        public async Task<ActionResult<IEnumerable<Aprobari>>> GetAprobari()
        {
            try
            {
                var aprobari = await _context.Aprobari.ToListAsync();
                return Ok(aprobari);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"A apărut o eroare: {ex.Message}");
            }
        }
        [HttpGet]
        [Route("StareAprobare")]
        public async Task<bool> GetAprobareStatusForSolicitare(int solicitareId)
        {
            var aprobari = await _context.Aprobari.FirstOrDefaultAsync(a => a.SolicitareId == solicitareId);

            if (aprobari != null)
            {
                return aprobari.Aprobata;
            }

            
            return false;
        }

        [HttpGet]
        [Route("UserAprobari")]
        public IActionResult GetAprobariByUserId(string userId)
        {
            try
            {
                var aprobari = _context.Aprobari
                    .Where(s => s.UserId == userId)
                    .ToList();
                return Ok(aprobari);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "A apărut o eroare la obținerea aprobarilor.");
            }
        }


        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateAprobari([FromBody] Aprobari model)
        {
            try
            {
                var solicitari = await _context.Solicitari.FindAsync(model.SolicitareId);
                if (solicitari == null)
                {
                    return NotFound("Solicitarea nu a fost găsit.");
                }

                var Aprobari = new Aprobari
                {
                    SolicitareId = model.SolicitareId,
                    Descriere = model.Descriere,
                    UserId = model.UserId,
                    Solicitare = solicitari
                };

                _context.Aprobari.Add(Aprobari);
                await _context.SaveChangesAsync();

                return Ok("Aprobarea a fost creată cu succes.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"A apărut o eroare: {ex.Message}");
            }
        }

    }
}
