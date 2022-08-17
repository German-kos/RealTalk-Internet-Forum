using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UtilityClass
    {
        // singleton
        private static UtilityClass instance;

        static object Key = new object();

        public static UtilityClass GetInstance()
        {
            if (instance == null)
            {
                lock (Key)
                {
                    if (instance == null) instance = new UtilityClass();
                }
            }
            return instance;
        }

        private UtilityClass()
        {
        }

        // datacontext
        private readonly DataContext _context;

        public UtilityClass(DataContext context)
        {
            _context = context;
        }

        // public async Task<bool> UserAlreadyExists(UserEntity entity)
        // {
        //     if (await _context.Users.FindAsync(entity.username) == null)
        //         return false;
        //     return true;
        // }
        public async Task<bool> UserAlreadyExists(UserEntity entity)
        {
            if (
                await _context
                    .Users
                    .FirstOrDefaultAsync(user =>
                        user.UserName.ToLower() == entity.username.ToLower()) ==
                null
            ) return false;
            return true;
        }

        public async Task<bool> EmailAlreadyExists(UserEntity entity)
        {
            if (
                await _context
                    .Users
                    .FirstOrDefaultAsync(user =>
                        user.Email.ToLower() == entity.email.ToLower()) ==
                null
            ) return false;
            return true;
        }
    }
}

public class UserEntity
{
    public string username { get; set; }

    public string email { get; set; }

    public string password { get; set; }
}

public class LoginForm
{
    public string username { get; set; }

    public string password { get; set; }
}
