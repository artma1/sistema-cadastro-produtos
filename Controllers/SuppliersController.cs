using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_vega.Models;
using sistema_vega.Services;


//ATENÇÃO
//TERMINAR DE TESTAR QRCODE GERADO E SUBIR

namespace sistema_vega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : Controller
    {
        private readonly AppDbContext _context;
        private readonly FilterService _filterService;
        //private readonly IQrCodeFormatter _qrCodeFormatter;

        public SuppliersController(AppDbContext context, FilterService filterService)
        {
            _context = context;
            _filterService = filterService;
            //   _qrCodeFormatter = qrCodeFormatter;
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
            var supplier = await _context.Suppliers
              .Include(s => s.Materials)  // Eager loading da lista de materiais
              .FirstOrDefaultAsync(s => s.Id == id);

            if (supplier == null)
            {
                return NotFound("Fornecedor não encontrado");
            }

            return Ok(supplier);
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<Supplier>>> GetFilteredMaterials([FromQuery] string nameFilter, [FromQuery] string dateFilter)
        {
            var filteredSuppliers = await _filterService.FilterEntitiesAsync<Supplier>(nameFilter, dateFilter);

            if (filteredSuppliers == null || !filteredSuppliers.Any())
            {
                return NotFound("Nenhum fornecedor encontrado na pesquisa.");
            }

            return Ok(filteredSuppliers);
        }

        // POST api/<SuppliersController>
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier([FromBody] Supplier supplier)
        {
            if (supplier == null)
            {
                return BadRequest("Fornecedor não pode ser nulo");
            }

            supplier.QRCode = "%CNPJ% - %CEP%" + (supplier.CreatedAt.HasValue ? " / CAD.%DATACADASTRO%" : "");

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
        [HttpGet("Report/{id}")]
        public async Task<IActionResult> Report(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var supplier = await _context.Suppliers.FindAsync(id);
            
            if (supplier == null)
            {
                return NotFound();
            }

            var materials = await _context.Materials
                .Where(c => c.IdSupplier == id)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
            
            return Ok(materials);
       }
    }
}
