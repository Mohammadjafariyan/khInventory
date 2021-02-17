using Microsoft.AspNetCore.Mvc;

namespace my_webapp.Controllers
{
    public class HelloController:Controller
    {


        public IActionResult Index()
        {
            return View("Index");
        }
    }
}