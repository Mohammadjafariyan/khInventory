using System.Collections.Generic;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace my_webapp.Model
{
    public class Person:EntitySafeDelete
    {

        public string Name { get; set; }
        public string MilliCode { get; set; }

        public string Mobile { get; set; }
    }
}