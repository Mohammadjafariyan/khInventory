﻿using SignalRMVCChat.Models.autoGeneratedContext;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace SignalRMVCChat.Areas.Customer.Service
{
    public class ExcelLikeDistributionService:GenericService<Distribution>
    {
        public ExcelLikeDistributionService(GenericImp<Distribution> impl
        ) : base(impl)
        {
        }

        
    }
}