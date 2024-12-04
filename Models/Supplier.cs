using System.ComponentModel.DataAnnotations;

namespace sistema_vega.Models
{
    public class Supplier
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Informe o nome do fornecedor")]
        [Display(Name="Nome")]
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        [Required(ErrorMessage = "Informe o endereço do fornecedor")]
        [Display(Name = "Endereço")]
        public string Adress { get; set; }
        [Required(ErrorMessage = "Informe o CNPJ do fornecedor (Apenas números)")]
        [Display(Name = "CNPJ")]
        public string CNPJ { get; set; }
        [Required(ErrorMessage = "Informe o CEP do fornecedor (Apenas números)")]
        [Display(Name = "CEP")]
        public string CEP { get; set; } 
        public string QRCode { get; set; }
        public ICollection<Material> Materials { get; set; }
    }
}
