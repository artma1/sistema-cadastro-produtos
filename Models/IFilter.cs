namespace sistema_vega.Models
{
    public interface IFilter
    {
        string Name { get; set; }
        DateTime? CreatedAt { get; set; }
    }
}
