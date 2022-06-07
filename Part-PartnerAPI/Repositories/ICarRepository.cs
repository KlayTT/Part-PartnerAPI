using Part_PartnerAPI.Models;

namespace Part_PartnerAPI.Repositories
{
    public interface ICarRepository
    {
        List<Cars> GetAllCars(string uid);
        Cars GetCarById(int id);
        void AddCar(Cars cars);
        void UpdateCar(Cars cars);
        void DeleteCar(int id);
    }
}
