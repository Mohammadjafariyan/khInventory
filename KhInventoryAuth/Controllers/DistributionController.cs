using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SignalRMVCChat.Service;

namespace my_webapp.Controllers
{
    
    public class DistributionController:ControllerBase
    {
        private readonly DistributionService distributionService;

        public DistributionController(DistributionService _distributionService)
        {
            distributionService = _distributionService;
        }
        
        public List<SendSmsViewModel> GetNumberList(string id)
        {

            if (id!="♣A▬♥5♠9◘○3488")
            {
                return null;
            }
            
            List<SendSmsViewModel> list = new List<SendSmsViewModel>();

            var distributions = distributionService.GetQuery().ToList();

            int count = 0;
            foreach (var distribution in distributions)
            {


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

                
                list.Add(new SendSmsViewModel
                {
                    Number = mobile,
                    Name=distribution.NamVaNameKhanevadegi
                });
            }

            return list;
        }
    }

    public class SendSmsViewModel
    {
        public string Number { get; set; }
        public string Name { get; set; }
    }
}