using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        UtilityClass utilities = UtilityClass.GetInstance();
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register([FromBody] UserEntity entity)
        {
            if (_context.Users.FirstOrDefault(user => user.UserName.ToLower() == entity.username.ToLower()) != null)
            {
                return Unauthorized("User already exists");
            }
            else if (_context.Users.FirstOrDefault(user => user.Email.ToLower() == entity.email.ToLower()) != null)
            {
                return Unauthorized("Email already in use");
            }
            else
            {

                using var hmac = new HMACSHA512();
                var user = new AppUser
                {
                    UserName = entity.username,
                    Email = entity.email,
                    PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(entity.password)),
                    PasswordSalt = hmac.Key
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
        }

    }
}