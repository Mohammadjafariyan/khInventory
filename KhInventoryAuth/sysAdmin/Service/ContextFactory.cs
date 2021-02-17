using my_webapp.Model;
using SignalRMVCChat.Areas.sysAdmin.Service;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace Engine.SysAdmin.Service
{
    public class ContextFactory
    {

        public static KhInventoryDbContext GetContext(string name)
        {
          
            return new KhInventoryDbContext();

        }
   

    }
    

}