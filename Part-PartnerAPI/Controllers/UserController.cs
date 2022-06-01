using Microsoft.AspNetCore.Mvc;
using Part_PartnerAPI.Repositories;
using Part_PartnerAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace Part_PartnerAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepo;

        public UserController(IUserRepository userRepository)
        {
            _userRepo = userRepository;
        }

        // GET
        [Authorize]
        [HttpGet]

        public List<Users> Get()
        {
            return _userRepo.GetAllUsers();
        }

        // GET BY FirebaseUserId
        [Authorize]
        [HttpGet("{firebaseUserId}")]

        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var matchingUser = _userRepo.GetByFirebaseUserId(firebaseUserId);
            if (matchingUser == null)
            {
                return NotFound();
            }

            return Ok(matchingUser);
        }

        [Authorize]
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var matchingUser = _userRepo.GetByFirebaseUserId(firebaseUserId);
            if (matchingUser == null)
            {
                return NotFound();
            }

            return Ok();
        }

        // POST
        [HttpPost]

        public IActionResult Post(Users users)
        {
            _userRepo.AddUser(users);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = users.FirebaseUserId }, users);
        }

        // Put
        [Authorize]
        [HttpPatch("{firebaseUserId}")]
        public IActionResult Put(string firebaseUserId, Users users)
        {
            if (firebaseUserId != users.FirebaseUserId)
            {
                return BadRequest();
            }

            var existingUser = _userRepo.GetByFirebaseUserId(firebaseUserId);
            if (existingUser == null)
            {
                return NotFound();
            }
            else
            {
                _userRepo.UpdateUser(users);
                return NoContent();
            }
        }

        // DELETE
        [Authorize]
        [HttpDelete("{firebaseUserId}")]

        public IActionResult Delete(string firebaseUserId)
        {
            var matchingUser = _userRepo.GetByFirebaseUserId(firebaseUserId);
            if (matchingUser == null)
            {
                return NotFound();
            }
            else
            {
                _userRepo.DeleteUser(matchingUser.FirebaseUserId);
                return NoContent();
            }
        }
    }
}
