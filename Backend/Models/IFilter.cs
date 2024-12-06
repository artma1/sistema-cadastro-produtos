namespace sistema_vega.Models
{
    public interface IFilter
    {
        int Id { get; }
        string Name { get; set; }
        DateTime? CreatedAt { get; set; }
    }
}
