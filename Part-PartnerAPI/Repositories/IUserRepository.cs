using Part_PartnerAPI.Models;

namespace Part_PartnerAPI.Repositories
{
    public interface IUserRepository
    {
        List<Users> GetAllCars();
        Users GetUserById(int id);
        void AddUser(Users users);
        void UpdateUser(Users users);
        void DeleteUser(int id);
    }
}
