using my_webapp.Model;
using my_webapp.Service;
using Microsoft.AspNetCore.Mvc;
using SignalRMVCChat.Areas.sysAdmin.Service;
using TelegramBotsWebApplication.Areas.Admin.Models;
using TelegramBotsWebApplication;

namespace my_webapp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IssueAssignmentController : BaseController<IssueAssignment, IssueAssignmentService>
    {
        public IssueAssignmentController(IssueAssignmentService service) : base(service)
        {
        }
        
        

        [HttpGet("[action]")]
        public MyEntityResponse<IssueAssignmentCalculationViewModel> GetAnimalFoodAndPersonQuota(int foodId,int personId)
        {
            var issue= _service.GetAnimalFoodAndPersonQuota(foodId,personId);

            
            return new MyEntityResponse<IssueAssignmentCalculationViewModel>
            {
                Status = MyResponseStatus.Success,
                Single = issue
            };
        }

        [HttpPost("[action]")]
        public   MyEntityResponse<IssueAssignment> Issue(IssueAssignment model)
        {

            
            base.Save(model);
            var issue= _service.GetWithPerson(model.Id);

            return new MyEntityResponse<IssueAssignment>
            {
                Status = MyResponseStatus.Success,
                Single = issue
            };

        }

        [HttpGet("[action]")]
        public virtual MyDataTableResponse<IssueAssignment>
              GetAllByAnimalFoodId(int? animalFoodId, int? take, int? skip)
        {
            MyDataTableResponse<IssueAssignment> resonse=null;

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