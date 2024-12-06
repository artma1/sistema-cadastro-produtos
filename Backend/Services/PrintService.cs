using sistema_vega.Models;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;

namespace YourProject.Services
{
    public class PrintService
    {
        public async Task<byte[]> GeneratePdf<T>(List<T> entities) where T : class, IFilter
        {
            using (var memoryStream = new MemoryStream())
            {
                using (var writer = new PdfWriter(memoryStream))
                using (var pdf = new PdfDocument(writer))
                {
                    var document = new Document(pdf);

                    document.Add(new Paragraph($"Lista de {typeof(T).Name}s").SetFontSize(18));

                    foreach (var entity in entities)
                    {
                        document.Add(new Paragraph($"ID: {entity.Id}"));
                        document.Add(new Paragraph($"Nome: {entity.Name}"));
                        document.Add(new Paragraph($"Cadastro em: {entity.CreatedAt?.ToString("dd/MM/yyyy") ?? "N/A"}"));
                        document.Add(new Paragraph("-----------------------------------"));
                    }

                    document.Close();
                    return memoryStream.ToArray();
                }
            }
        }
    }
}