﻿using SignalRMVCChat.Models.autoGeneratedContext;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace SignalRMVCChat.Service
{
    public class MalInfoService:GenericService<MalInfos>
    {
        public MalInfoService(GenericImp<MalInfos> impl
        ) : base(impl)
        {
        }
    }
}