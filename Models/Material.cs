using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace sistema_vega.Models
{
    public class Material
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("IdSupplier")]
        public int IdSupplier { get; set; }
        [Required(ErrorMessage = "Informe o código do material")]
        [Display(Name = "Código")]
        public string Code { get; set; }
        [Required(ErrorMessage = "Informe o nome do material")]
        [Display(Name = "Nome")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Informe a descrição do material")]
        [Display(Name = "Descrição")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Informe o código fiscal do material")]
        [Display(Name = "Código Fiscal")]
        public string FiscalCode { get; set; }
        [Required(ErrorMessage = "Informe o tipo do material")]
        [Display(Name = "Tipo")]
        public string Specie { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; } = null;
        public string UpdatedBy { get; set; }
        [JsonIgnore]
        public Supplier Supplier { get; set; }
    }
}
