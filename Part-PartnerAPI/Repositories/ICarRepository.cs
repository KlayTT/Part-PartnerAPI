using Part_PartnerAPI.Models;

namespace Part_PartnerAPI.Repositories
{
    public interface ICarRepository
    {
        List<Cars> GetAllCars();
        Cars GetCarById(int id);
        void AddCar(Cars cars);
        void UpdateCar(Cars cars);
        void DeleteCar(int id);
    }
}
