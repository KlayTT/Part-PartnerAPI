using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Part_PartnerAPI.Models
{
    public class Cars
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Year { get; set; }
        public string Color { get; set; }
        public string ImageUrl { get; set; }
        [ValidateNever]
        public string PartId { get; set; }
        public string Uid { get; set; }

    }
}
