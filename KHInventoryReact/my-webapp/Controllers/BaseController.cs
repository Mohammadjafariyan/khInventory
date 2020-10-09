using Microsoft.AspNetCore.Mvc;
using TelegramBotsWebApplication.Areas.Admin.Models;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace my_webapp.Controllers
{
    public class BaseController<T, Service> : ControllerBase where Service : BaseService<T> where T : class, IEntity, new()
    {
        protected readonly Service _service;

        public BaseController(Service service)
        {
            _service = service;
        }

        [HttpGet]
        public virtual MyDataTableResponse<T> GetAll(int? take, int? skip)
        {
            if (take.HasValue)
            {
                var resonse = _service.GetAsPaging(take.Value, skip, null);
                resonse.Status = MyResponseStatus.Success;
                return resonse;

            }
            else
            {
                var resonse = _service.GetAll();
                resonse.Status = MyResponseStatus.Success;
                return resonse;
            }
        }


        [HttpPost]
        public virtual MyEntityResponse<int> Save(T model)
        {
            var resonse = _service.Save(model);
            resonse.Status = MyResponseStatus.Success;
            return resonse;
        }


    }
}