﻿using System.Collections.Generic;
using System.Linq;

namespace TelegramBotsWebApplication.Areas.Admin.Service
{
    public class GenericService<T> : BaseService<T> where T : class,IEntity,new()
    {
        public GenericService(GenericImp<T> impl) : base(impl)
        {
        }
    }
}