using Microsoft.AspNetCore.Mvc;
using my_webapp.Model;
using my_webapp.Service;
using TelegramBotsWebApplication.Areas.Admin.Models;

namespace my_webapp.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Components.Route("[controller]")]
    public class PrintController : ControllerBase
    {
        private readonly IssueAssignmentService _assignmentService;

        public PrintController(IssueAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpGet("[action]")]
        public virtual MyEntityResponse<IssueAssignment> IssueAssignment(int id)
        {
            var issueAssignment = _assignmentService.GetForPrintById(id);

            return new MyEntityResponse<IssueAssignment>
            {
                Single = issueAssignment,
                Status = MyResponseStatus.Success
            };
        }
    }
}