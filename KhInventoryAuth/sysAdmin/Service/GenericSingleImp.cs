﻿using System.Linq;
using Microsoft.EntityFrameworkCore;
using my_webapp.Model;
using TelegramBotsWebApplication.Areas.Admin.Models;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace SignalRMVCChat.Areas.sysAdmin.Service
{
    public class GenericSingleImp<T> : GenericImp<T> where T : class, IEntity,new()
    {
        public GenericSingleImp(KhInventoryDbContext KhInventoryDbContext) : base(KhInventoryDbContext)
        {
        }


        public virtual T GetSingle()
        {
            return GetQuery().First();
        }
        public override IQueryable<T> GetQuery()
        {
            var queryable = base.GetQuery();
            if (!queryable.Any())
            {
                Save(new T());
            }

            return base.GetQuery();
        }

        public override MyEntityResponse<int> Save(T model)
        {

           var single= base.GetQuery().SingleOrDefault();
            if (single == null)
            {
                db.Set<T>().Add(model);
            }
            else
            {
                model.Id = single.Id;

                db.Set<T>().Attach(single);
                db.Entry(single).CurrentValues.SetValues(model);

            }



            db.SaveChanges();
            db.Entry(model).State = EntityState.Detached;

            return new MyEntityResponse<int>
            {
                Single = model.Id
            };
        }


        public override MyEntityResponse<T> GetById(int id, string notFoundMsg = null)
        {
            return new MyEntityResponse<T>
            {
                Single = GetSingle()
            };
        }
    }
}