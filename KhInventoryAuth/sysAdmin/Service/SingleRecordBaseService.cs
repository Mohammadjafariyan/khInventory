
using TelegramBotsWebApplication;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace SignalRMVCChat.Areas.sysAdmin.Service
{
    public class SingleRecordBaseService<T>:GenericService<T>where T : class,IEntity,new()
    {
    


        
        
        public virtual T GetSingle()
        {
            return ((GenericSingleImp<T>)Impl).GetSingle();
        }

        public SingleRecordBaseService(GenericImp<T> impl) : base(impl)
        {
        }
    }
}