using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using KhInventoryAuth;
using KhInventoryAuth.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace my_webapp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public bool Get()
        {
            if (HttpContext.Request.Cookies.ContainsKey("first_request"))
            {
                try
                {
                    var token = HttpContext.Request.Cookies["first_request"];
                    EncryptionHelper.Decrypt(token);
                    return true;
                }
                catch (Exception e)
                {
                    return false;
                }
            }

            return false;
        }
        
        
    }
}
/*@Mfjw154*/