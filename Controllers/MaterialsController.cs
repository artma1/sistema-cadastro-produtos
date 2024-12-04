using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_vega.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace sistema_vega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialsController : Controller
    {
        private readonly AppDbContext _context;

        public MaterialsController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<MaterialsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Material>>> GetMaterials()
        {
           // var appDbContext = _context.Materials.Include(c => c.Supp);
            //return (await appDbContext.ToListAsync());
            return await _context.Materials.ToListAsync();
        }

        // GET api/<MaterialsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Material>> Details(int id)
        {
            var material = await _context.Materials.FindAsync(id);

            if (material == null)
            {
                return NotFound("Produto não encontrado");
            }

            return material;
        }

        // POST api/<MaterialsController>
        [HttpPost]
        public async Task<ActionResult<Material>> PostMaterial([FromBody] Material material)
        {
            if (material == null)
            {
                return BadRequest("Produto não pode ser nulo");
            }

            _context.Materials.Add(material);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Details), new { id = material.Id }, material);
        }

        // PUT api/<MaterialsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterial(int id, [FromBody] Material material)
        {
            if (material == null)
            {
                return NotFound("Produto não encontrado");
            }
            if (id != material.Id)
            {
                return BadRequest("Id do produto incorreto");
            }

            material.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(material);
        }

        // DELETE api/<MaterialsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            var material = await _context.Materials.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();

            return Ok("Produto apagado com sucesso!");
        }
    }
}
