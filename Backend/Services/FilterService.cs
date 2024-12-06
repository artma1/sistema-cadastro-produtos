using sistema_vega.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Globalization;

namespace sistema_vega.Services
{
    public class FilterService
    {
        private readonly AppDbContext _context;

        public FilterService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<T>> FilterEntitiesAsync<T>(string nameFilter, string dateFilter) where T : class, IFilter
        {
            var query = _context.Set<T>().AsQueryable();

            if (!string.IsNullOrEmpty(nameFilter))
            {
                query = query.Where(e => e.Name.Contains(nameFilter));
            }

            if (!string.IsNullOrEmpty(dateFilter))
            {
                if (DateTime.TryParseExact(dateFilter, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime date))
                {
                    query = query.Where(e => e.CreatedAt.HasValue && e.CreatedAt.Value.Date == date.Date);
                }
                else
                {
                    throw new ArgumentException("Formato de data inválido.");
                }
            }

            return await query.ToListAsync();
        }
    }
}