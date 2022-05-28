using Part_PartnerAPI.Models;

namespace Part_PartnerAPI.Repositories
{
    public interface IUserRepository
    {
        List<Users> GetAllUsers();
        Users GetByFirebaseUserId(string firebaseUserId);
        void AddUser(Users users);
        void UpdateUser(Users users);
        void DeleteUser(string firebaseUserId);
    }
}
