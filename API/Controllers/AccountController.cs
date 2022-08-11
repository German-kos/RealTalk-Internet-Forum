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
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register([FromBody] UserEntity entity)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = entity.username,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(entity.password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public class UserEntity
        {
            public string username { get; set; }
            public string password { get; set; }
        }
    }
}