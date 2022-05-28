using Part_PartnerAPI.Models;

namespace Part_PartnerAPI.Repositories
{
    public interface IPartRepository
    {
        List<Parts> GetAllParts();
        Parts GetPartById(int id);
        void AddCar(Parts parts);
        void UpdateCar(Parts parts);
        void DeletePart(int id);
    }
}
