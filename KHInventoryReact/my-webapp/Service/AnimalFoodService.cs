using my_webapp.Model;
using TelegramBotsWebApplication.Areas.Admin.Models;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace my_webapp.Service
{
    public class AnimalFoodService:GenericServiceSafeDelete<AnimalFood>
    {
        public AnimalFoodService(GenericSafeDeleteImp<AnimalFood> Impl) : base(Impl)
        {
        }


    }
}