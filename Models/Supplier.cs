namespace sistema_vega.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Adress { get; set; }
        public string CNPJ { get; set; }
        public string CEP { get; set; } 
        public string QRCode { get; set; }

    }
}
