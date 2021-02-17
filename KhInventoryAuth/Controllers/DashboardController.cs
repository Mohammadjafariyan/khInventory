using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using my_webapp.Service;
using SignalRMVCChat.Areas.Customer.Service;
using SignalRMVCChat.Service;

namespace my_webapp.Controllers
{
    public class DashboardController : Controller
    {
        private readonly DistributionService distributionService;

        public DashboardController(DistributionService _distributionService)
        {
            distributionService = _distributionService;
        }
        //   private  ServiceSoapClient _smsClient = new ServiceSoapClient();
        

        [HttpGet]
        public ActionResult Index()
        {
            
            return View("Index");
        }
        
        [HttpGet]
        public ActionResult PrintDistribution()
        {
            
            return View("PrintDistribution");
        }

        
        [HttpGet]
        public ActionResult PrintMalinfo()
        {
            
            return View("PrintMalinfo");
        }

        [HttpGet]
        public ActionResult info()
        {
            return View("MalInfo");
        }


        [HttpGet]
        public async Task<ActionResult> SendSMS(string pattern)
        {
          

            var distributions = distributionService.GetQuery().ToList();

            int count = 0;
            foreach (var distribution in distributions)
            {
                string text = pattern.Replace("%personName", distribution.NamVaNameKhanevadegi);


                if (string.IsNullOrEmpty(distribution.Telephone))
                {
                    continue;
                }

                string mobile = distribution.Telephone + "";
                if (mobile.StartsWith("9"))
                {
                    mobile = "0" + mobile;
                }

                if (mobile.Length != 11)
                {
                    continue;
                }

                //await _service.SendSms("09010894680", text);

                string status = "";//    _smsClient.SendSMS("zsms5828", "95919285", "سلام آقای محمد حکیمی پور سهمیه سبوس این ماه شما آماده دریافت است نمایندگی تعاونی کشاوزی و صنعت دام خسروشاه و حومه	", mobile, "50002224032");

                count++;
                //    await _smsClient.SendSMSAsync("zsms5828", "95919285", text, mobile, "0098");
            }


    //        string status2 = _smsClient.SendSMS("zsms5828", "95919285", text, mobile, "50002224032");

            return View("Index");
        }
    }
}