using TelegramBotsWebApplication.Areas.Admin.Models;
using Microsoft.AspNetCore.Mvc;
using TelegramBotsWebApplication.Areas.Admin.Models;
using TelegramBotsWebApplication;
using Microsoft.AspNetCore.Diagnostics;
using SignalRMVCChat.Areas.sysAdmin.Service;

namespace my_webapp.Controllers
{

    [ApiExplorerSettings]
public class ErrorsController : ControllerBase
{
    [Route("Errors")]
    public MyEntityResponse<int> Error()
    {
        var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
        var exception = context?.Error; // Your exception
        var code = 500; // Internal Server Error by default

               code = 400; // BadRequest

        Response.StatusCode = code; // You can use HttpStatusCode enum instead

        return new MyEntityResponse<int>{
            Status=MyResponseStatus.Fail,
            Message=MyGlobal.RecursiveExecptionMsg(exception)
        }; // Your error model
    }
}
}