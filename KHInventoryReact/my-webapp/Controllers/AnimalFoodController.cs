using Microsoft.AspNetCore.Mvc;
using my_webapp.Model;
using my_webapp.Service;

namespace my_webapp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnimalFoodController:BaseController<AnimalFood,AnimalFoodService>
    {
        public AnimalFoodController(AnimalFoodService service) : base(service)
        {
        }
    }



}