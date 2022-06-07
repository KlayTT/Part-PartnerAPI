using Part_PartnerAPI.Models;
using Part_PartnerAPI.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Part_PartnerAPI.Controllers
{
    [Route("api/parts")]
    [ApiController]
    public class PartController : Controller
    {
        private readonly IPartRepository _partRepo;

        public PartController(IPartRepository partRepository)
        {
            _partRepo = partRepository;
        }

        // Get All
        [HttpGet]
        public List<Parts> GetAllParts()
        {
            return _partRepo.GetAllParts();
        }

        // Get Id
        [HttpGet("{id}")]
        public Parts Get(int id)
        {
            return _partRepo.GetPartById(id);
        }

        // Post
        [HttpPost]
        public IActionResult Post(Parts newPart)
        {
            _partRepo.AddPart(newPart);
            return Ok(newPart);
        }

        // Put
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPatch("{id}")]
        public IActionResult Put(int id, Parts parts)
        {
            if (id != parts.Id)
            {
                return BadRequest();
            }
            var existingPart = _partRepo.GetPartById(id);
            if (existingPart == null)
            {
                return NotFound();
            }
            else
            {
                _partRepo.UpdatePart(parts);
                return NoContent();
            }
        }

        // Delete
        [HttpDelete("{id}")]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            var matchingPart = _partRepo.GetPartById(id);
            if (matchingPart == null)
            {
                return NotFound();
            }
            else
            {
                _partRepo.DeletePart(matchingPart.Id);
                return NoContent();
            }
        }
    }
}
