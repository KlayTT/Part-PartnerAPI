using System.ComponentModel.DataAnnotations;

namespace Part_PartnerAPI.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        [Required]
        public string FirebaseUserId { get; set; }
    }
}
