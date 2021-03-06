﻿using SignalRMVCChat.Models.autoGeneratedContext;
using SignalRMVCChat.Service;
using TelegramBotsWebApplication.Areas.Admin.Controllers;

namespace my_webapp.Controllers
{
    
    public class DistribController:GenericController<Distribution>
    {
        public DistribController(DistributionService DistributionService)
        {
            Service = DistributionService; //SignalRMVCChat.DependencyInjection.Injector.Inject<DistributionService>();
        }
    }
}