using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
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
        // Registration controller for the application
        // As of right now, the registration controller expects to get these fields from the request:
        // username, password, first name, last name, email. all fields are required
        // the controller recieves and checks if the username is already taken.
        // If the username already exists in the DB, a bad request is returned.
        // If the username does not exist, it proceeds to the registration of the user and inserts him into the DB.
        // The controller creates a new instance of the AppUser class, and adds the inserted data into it.
        // For the password, it encrypts it using HMACSHA512, and instead of saving the password to the DB,
        // it saves the hash and salt from the encryption.
        public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDTO)
        {
            if (await UserAlreadyExists(registerDTO.Username))
                return BadRequest("This username is taken.");
            //
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDTO.Username,
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                Email = registerDTO.Email,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };
            //
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }
        [HttpPost("signin")]
        // Sign in controller for the application
        // As of right now, the sign-in controller expects to get these fields from the requests:
        // username, password. both fields are requires.
        // The controller first looks for a user with the matching username in the DB,
        // if it finds a user, it then uses the hashSalt from user found in the DB, and encrypts the password that was
        // passed from the sign in request.
        // It then compares the two encrypted passwords, the one from the DB user, and the second from the sign in request.
        // If the hashes match, a DTO object is passed with the non-sensitive data related to the user.
        // If the hashes do not match, a an http unauthorized error is returned instead.
        public async Task<ActionResult<SignedInUserDTO>> SignIn(SignInDTO signInDTO)
        {
            // get user from db
            var user = await _context.Users.SingleOrDefaultAsync(user => user.UserName.ToLower() == signInDTO.Username.ToLower());
            if (user == null)
                return Unauthorized("Invalid username or password");

            // encrypt and compare passwords
            if (PasswordsMatch(signInDTO.Password, user.PasswordHash, user.PasswordSalt))
            {
                var signInUser = new SignedInUserDTO
                {
                    Id = user.id,
                    Username = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.LastName
                };
                return signInUser;
            }
            else return Unauthorized("Invalid username or password");
        }
        // Pass the password from the sign-in request, password hash and salt from the user found in the DB
        // The password from the request is then encrypted, and compared with the password hash from the DB
        private bool PasswordsMatch(string password, byte[] passwordHash, byte[] passwordSalt)
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
        // Pass a username (str) to check if the name is already in the DB.
        // If the name is already in the DB, then the username is taken.
        // T = in use, F = not in use
        private async Task<bool> UserAlreadyExists(string username)
        {
            return await _context.Users.AnyAsync(user => user.UserName.ToLower() == username.ToLower());
        }
    };
}

