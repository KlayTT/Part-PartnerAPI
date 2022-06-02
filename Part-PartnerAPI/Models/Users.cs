using System.ComponentModel.DataAnnotations;

namespace Part_PartnerAPI.Models
{
    public class Users
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirebaseUserId { get; set; }
    }
}
