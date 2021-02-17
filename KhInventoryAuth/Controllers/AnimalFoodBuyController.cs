using Microsoft.AspNetCore.Mvc;
using my_webapp.Model;
using my_webapp.Service;
using SignalRMVCChat.Areas.sysAdmin.Service;
using TelegramBotsWebApplication;
using TelegramBotsWebApplication.Areas.Admin.Models;

namespace my_webapp.Controllers
{
    [ApiController]
    [Route("[controller]")]
     public class AnimalFoodBuyController:BaseController<AnimalFoodBuy,AnimalFoodBuyService>
    {
        public AnimalFoodBuyController(AnimalFoodBuyService service) : base(service)
        {
        }

          [HttpGet("[action]")]
        public virtual MyDataTableResponse<AnimalFoodBuy>
              GetAllByAnimalFoodId(int? animalFoodId, int? take, int? skip)
        {
            MyDataTableResponse<AnimalFoodBuy> resonse=null;

            if (animalFoodId.HasValue)
            {
                resonse = _service.GetAllByAnimalFoodId(animalFoodId.Value, take, skip);

            }else{
              resonse=_service.GetAsPaging(take ?? MyGlobal.PagingCount,skip,null)   ;
            }

            resonse.Status = MyResponseStatus.Success;
            return resonse;
        }




    }
}