using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_vega.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace sistema_vega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : Controller
    {
        private readonly AppDbContext _context;

        public SuppliersController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<SuppliersController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSuppliers()
        {
            return await _context.Suppliers.ToListAsync();
        }

        // GET api/<SuppliersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);

            if (supplier == null)
            {
                return NotFound("Fornecedor não encontrado");
            }

            return supplier;
        }

        // POST api/<SuppliersController>
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier([FromBody] Supplier supplier)
        {
            if (supplier == null)
            {
                return BadRequest("Fornecedor não pode ser nulo");
            }
            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSupplier), new { id = supplier.Id }, supplier);
        }

        // PUT api/<SuppliersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, [FromBody] Supplier supplier)
        {
            if (supplier == null)
            {
                return NotFound("Fornecedor não encontrado");
            }
            if (id != supplier.Id)
            {
                return BadRequest("Id do fornecedor incorreto");
            }

            await _context.SaveChangesAsync();
            return Ok(supplier);
        }

        // DELETE api/<SuppliersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();

            return Ok("Fornecedor apagado com sucesso!");
        }
    }
}
