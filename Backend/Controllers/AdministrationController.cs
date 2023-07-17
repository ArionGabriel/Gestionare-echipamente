    using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Gestionare.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace Gestionare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministrationController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<IdentityUser> userManager;

        public AdministrationController(RoleManager<IdentityRole> roleManager,
                                                                  UserManager<IdentityUser> userManager)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
        }
        [HttpGet("roles")]
        public IActionResult GetRoles()
        {
            var roles = roleManager.Roles.Select(r => r.Name).ToList();

            return Ok(roles);
        }

        [HttpGet("user-role")]
       
        public async Task<IActionResult> GetUserRoleByEmail(string email)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return NotFound(); 
            }

            var roles = await userManager.GetRolesAsync(user);

            return Ok(roles.FirstOrDefault()); 
        }

        [HttpPost("assign-role")]
        
        public async Task<IActionResult> AssignRole(AssignRole model)
        {
            var user = await userManager.FindByIdAsync(model.UserId);
            if (user == null)
                return NotFound();

            var roleExists = await roleManager.RoleExistsAsync(model.RoleName);
            if (!roleExists)
                return BadRequest("Role does not exist");

            await userManager.AddToRoleAsync(user, model.RoleName);
            return Ok();
        }
            
        [HttpPost]
        
        public async Task<IActionResult> CreateRole(CreateRole model)
        {
            if (ModelState.IsValid)
            {
                IdentityRole identityRole = new IdentityRole
                {
                    Name = model.RoleName
                };

                IdentityResult result = await roleManager.CreateAsync(identityRole);

                if (result.Succeeded)
                {
                    return Ok("Merge");
                }

                else return Ok("Nu merge");
            }

            var modelErrors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return BadRequest(modelErrors);
        }
    }
}
