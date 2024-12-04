using Microsoft.EntityFrameworkCore;

namespace sistema_vega.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Defina as suas DbSets aqui
        public DbSet<Material> Materials { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }

    }
}
