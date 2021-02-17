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
    public class WLogoutController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WLogoutController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public bool Get()
        {
            if (HttpContext.Request.Cookies.ContainsKey("first_request"))
            {
                
                Response.Cookies.Delete("first_request");

            }

            return false;
        }
        
        
    }
}
/*@Mfjw154*/