namespace sistema_vega.Models
{
    public class Material
    {
        public int Id { get; set; }
        public int IdSupplier { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string FiscalCode { get; set; }
        public string Specie { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
    }
}
