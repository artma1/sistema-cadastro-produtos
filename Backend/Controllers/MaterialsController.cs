using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_vega.Models;
using sistema_vega.Services;
using YourProject.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace sistema_vega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly QRCodeService _qRCodeService;
        private readonly FilterService _filterService;
        private readonly PrintService _printService;

        public MaterialsController(AppDbContext context, QRCodeService qRCodeService
            , FilterService filterService, PrintService printService)
        {
            _context = context;
            _qRCodeService = qRCodeService;
            _filterService = filterService;
            _printService = printService;
        }
        // GET: api/<MaterialsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Material>>> GetMaterials()
        {
            var appDbContext = _context.Materials.Include(c => c.Supplier);
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
           
            var supplier = await _context.Suppliers
        .Include(s => s.Materials) 
        .FirstOrDefaultAsync(s => s.Id == material.IdSupplier);

            supplier.Materials.Add(material);

            _context.Materials.Add(material);
            
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Details), new { id = material.Id }, material);
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<Material>>> GetFilteredMaterials([FromQuery] string nameFilter, [FromQuery] string dateFilter)
        {
            var filteredMaterials = await _filterService.FilterEntitiesAsync<Material>(nameFilter, dateFilter);

            if (filteredMaterials == null || !filteredMaterials.Any())
            {
                return NotFound("Nenhum produto encontrado na pesquisa.");
            }

            return Ok(filteredMaterials);
        }

        [HttpGet("print")]
        public async Task<IActionResult> GenerateMaterialsPdf()
        {
            var materials = await _context.Materials.ToListAsync();
            var pdfBytes = await _printService.GeneratePdf(materials);

            return File(pdfBytes, "application/pdf", "produtos.pdf");
        }
        

        [HttpGet("QRCode/{id}")]
        public async Task<ActionResult<Material>> QRCodeGen(int id)
        {
            var material = await _context.Materials.FindAsync(id);

            if (material == null)
            {
                return NotFound("Produto não encontrado");
            }

            var supplier = await _context.Suppliers
                 .Where(s => s.Id == material.IdSupplier)
                 .FirstOrDefaultAsync();
            
            string qrcode = _qRCodeService.QRCodeGen(supplier);

            return Ok(qrcode);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterial(int id, [FromBody] Material material)
        {
            if (material == null)
            {
                return BadRequest("Material não pode ser nulo");
            }

            if (id != material.Id)
            {
                return BadRequest("ID do produto incorreto");
            }

            // Encontrar o material no banco de dados
            var existingMaterial = await _context.Materials.FindAsync(id);
            if (existingMaterial == null)
            {
                return NotFound("Material não encontrado");
            }

            // Atualiza as propriedades do material
            existingMaterial.Name = material.Name;
            existingMaterial.Description = material.Description;
            existingMaterial.Code = material.Code;
            existingMaterial.FiscalCode = material.FiscalCode;
            existingMaterial.Specie = material.Specie;
            existingMaterial.IdSupplier = material.IdSupplier;
            existingMaterial.UpdatedAt = DateTime.UtcNow;
            existingMaterial.UpdatedBy = material.UpdatedBy;  // Atualize conforme necessário

            // Salva as alterações no banco de dados
            await _context.SaveChangesAsync();

            // Retorna o material atualizado na resposta
            return Ok(existingMaterial);
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
