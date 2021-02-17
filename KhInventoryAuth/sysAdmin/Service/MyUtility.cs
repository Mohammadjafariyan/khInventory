using System.Linq;
using my_webapp.Model;
using SignalRMVCChat.Areas.sysAdmin.Service;

namespace KhInventoryAuth.sysAdmin.Service
{
    public class MyUtility
    {
        public static IQueryable<T> AsPaging<T>(IQueryable<T> query, int? take, int? skip)
        {

            if (take<=0)
            {
                take = null;
            }
            if (skip<=0)
            {
                skip = null;
            }

            take ??= MyGlobal.PagingCount;


            if (skip.HasValue)
            {
                query= query.Skip(skip.Value * take.Value).Take(take.Value);
            }
            else
            {
                query= query.Take(take.Value);
            }

            return query;

        }
    }
}