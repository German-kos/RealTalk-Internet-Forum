using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            if (UserAlreadyExists(entity.username))
                return BadRequest("This username is taken.");
            byte[] passwordHash, passwordSalt;

            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(entity.password));
            }
            AppUser user = new AppUser();
            user.UserName = entity.username;
            user.FirstName = entity.firstName;
            user.LastName = entity.lastName;
            user.Email = entity.email;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            //
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }
        [HttpPost("signin")]
        public async Task<ActionResult<SignedInUser>> SignIn([FromBody] LoginForm entity)
        {
            var user = await _context.Users.FirstOrDefaultAsync(usr => usr.UserName.ToLower() == entity.username);
            if (user == null)
                return null;
            if (!MatchPasswordHash(entity.password, user.PasswordHash, user.PasswordSalt))
                return null;
            var userResult = new SignedInUser()
            {
                id = user.id,
                username = user.UserName,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email
            };
            return userResult;
        }
        private bool MatchPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var passwordHashResult = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < passwordHashResult.Length; i++)
                {
                    if (passwordHashResult[i] != passwordHash[i])
                        return false;
                }
                return true;
            }
        }
        private bool UserAlreadyExists(string username)
        {
            var user = _context.Users.FirstOrDefault(usr => usr.UserName.ToLower() == username.ToLower());
            if (user == null)
                return false;
            return true;
        }
    };
}

