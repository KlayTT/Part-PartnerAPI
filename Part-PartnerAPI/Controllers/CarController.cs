using Part_PartnerAPI.Models;
using Part_PartnerAPI.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Part_PartnerAPI.Controllers
{
        [Route("api/cars")]
        [ApiController]
    public class CarController : Controller
    {
        private readonly ICarRepository _carRepo;

        public CarController(ICarRepository carRepository)
        {
            _carRepo = carRepository;
        }

        // Get All
        [HttpGet]
        public List<Cars> GetAllCars()
        {
            return _carRepo.GetAllCars();
        }

        // Get Id
        [HttpGet("{id}")]
        public Cars Get(int id)
        {
            return _carRepo.GetCarById(id);
        }

        // Post
        [HttpPost]
        public IActionResult Post(Cars newCar)
        {
            _carRepo.AddCar(newCar);
            return Ok(newCar);
        }

        // Put
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPatch("{id}")]
        public IActionResult Put(int id, Cars cars)
        {
            if (id != cars.Id)
            {
                return BadRequest();
            }
            var existingCar = _carRepo.GetCarById(id);
            if (existingCar == null)
            {
                return NotFound();
            }
            else
            {
                _carRepo.UpdateCar(cars);
                return NoContent();
            }
        }

        // Delete
        [HttpDelete("{id}")]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            var matchingCar = _carRepo.GetCarById(id);
            if (matchingCar == null)
            {
                return NotFound();
            }
            else
            {
                _carRepo.DeleteCar(matchingCar.Id);
                return NoContent();
            }
        }
    }
}
