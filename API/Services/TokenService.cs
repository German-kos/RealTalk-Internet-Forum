using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

// namespace API.Services
// {
//     public class TokenService : ITokenService
//     {
//         private readonly SymmetricSecurityKey _key;

//         public TokenService(IConfiguration config)
//         {
//             _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
//         }

//         public string CreateToken(AppUser user)
//         {
//             // adding claims to the token
//             var claims = new List<Claim>{
//                 new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
//             };

//             //adding credentials, need the key and algorithm
//             var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

//             // describe the token - what's it going to look like
//             var tokenDescriptor = new SecurityTokenDescriptor
//             {
//                 Subject = new ClaimsIdentity(claims),
//                 Expires = DateTime.Now.AddDays(7),
//                 SigningCredentials = credentials
//             };

//             // token handler to create the token
//             var tokenHandler = new JwtSecurityTokenHandler();

//             // creating the token
//             var token = tokenHandler.CreateToken(tokenDescriptor);

//             // return the serialized token
//             return tokenHandler.WriteToken(token);
//         }
//     }
// }
namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreateToken(AppUser user)
        {
            // adding claims to token
            var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            // adding credentials, need the key and algorithm
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // describe our token (how it's going to look)
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            // after creating our token, we need token handler to create it
            var tokenHandler = new JwtSecurityTokenHandler();

            // create token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // return token
            return tokenHandler.WriteToken(token);
        }
    }
}