using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Part_PartnerAPI.Models
{
    public class Parts
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        [ValidateNever]
        public string Miles { get; set; }
        [ValidateNever]
        public DateTime DatePurchased { get; set; }
        [ValidateNever]
        public DateTime NextMatnience { get; set; }
        public string Uid { get; set; }

    }
}
