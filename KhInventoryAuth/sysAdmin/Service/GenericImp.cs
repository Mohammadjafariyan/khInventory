﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using my_webapp.Model;
using SignalRMVCChat.Service;
using TelegramBotsWebApplication.Areas.Admin.Models;

namespace TelegramBotsWebApplication.Areas.Admin.Service
{
    public class GenericImp<T> : IService<T> where T : class, IEntity
    {
        public GenericImp(KhInventoryDbContext KhInventoryDbContext)
        {
            db = KhInventoryDbContext;
        }

        protected readonly KhInventoryDbContext db;
        public virtual List<T> GetMocklist()
        {
            return  new List<T>();
        }

        public void Save(List<T> models)
        {
            var entities = db.Set<T>();

            foreach (var model in models.ToList())
            {
                if (model.Id == 0)
                {
                    entities.Add(model);
                }
                else
                {
                    var entity = entities.FirstOrDefault(e => e.Id == model.Id);
                    if (entity == null)
                    {
                        throw new Exception("رکورد یافت نشد");
                    }


                    db.Entry(entity).CurrentValues.SetValues(model);
                }
            }
           


            db.SaveChanges();
        }

        internal void Save<T>(List<T> models) where T : class, IEntity, new()
        {
            throw new NotImplementedException();
        }

        public virtual List<T> GetAll()
        {
            return GetQuery().ToList();
        }

        public virtual MyDataTableResponse<T> GetAsPaging(int take, int? skip, int? dependId)
        {
            if (take <= 0)
            {
                take = 20;
            }

            if (skip <= 0)
            {
                skip = null;
            }

            var entities = GetQuery();

            entities = IncludeForGetAsPagingHelper(entities);
            dynamic dependEntity = null;
            if (dependId.HasValue)
            {
                entities = FilterDependIdForPagingHelper(entities, dependId.Value, out dependEntity);
            }

            IQueryable<T> res;
            if (skip.HasValue && skip > 0)
            {
                res = entities.OrderByDescending(e => e.Id).Skip(skip.Value).Take(take);
            }
            else
            {
                res = entities.OrderByDescending(e => e.Id).Take(take);
            }

            return new MyDataTableResponse<T>
            {
                LastSkip = skip,
                LastTake = take,
                EntityList = res.ToList(),
                Total = res.Count(),
                DependEntity = dependEntity
            };
        }

        protected virtual IQueryable<T> IncludeForGetAsPagingHelper(IQueryable<T> entities)
        {
            return entities;
        }

        protected virtual IQueryable<T> FilterDependIdForPagingHelper(IQueryable<T> entities, int value,
            out dynamic dependEntity)
        {
            dependEntity = null;
            return entities;
        }


        public virtual IQueryable<T> GetQuery()
        {
            
            return db.Set<T>().AsNoTracking().AsQueryable();
        }

        public virtual MyEntityResponse<T> GetById(int id, string notFoundMsg = null)
        {
            var entities = GetQuery();

            var entity = entities.FirstOrDefault(e => e.Id == id);
            if (entity == null)
            {
                throw new NotFoundExeption(notFoundMsg ??  "رکورد یافت نشد");
            }

            return new MyEntityResponse<T>
            {
                Single = entity
            };
        }


        public virtual MyEntityResponse<int> Save(T model)
        {
            var entities = db.Set<T>();

            T newEntity;

            if (model.Id == 0)
            {
                entities.Add(model);
                newEntity = model;
            }
            else
            {
                var entity = entities.FirstOrDefault(e => e.Id == model.Id);
                if (entity == null)
                {
                    throw new Exception("رکورد یافت نشد");
                }


                db.Entry(entity).CurrentValues.SetValues(model);
                newEntity = entity;
            }


            db.SaveChanges();
            db.Entry(model).State = EntityState.Detached;

            return new MyEntityResponse<int>
            {
                Single = newEntity.Id
            };
        }

        public virtual MyEntityResponse<bool> DeleteById(int id)
        {
            var myEntityResponse = GetById(id);

            db.Set<T>().Attach(myEntityResponse.Single);

            db.Entry(myEntityResponse.Single).State = EntityState.Deleted;
            db.SaveChanges();

            return new MyEntityResponse<bool>
            {
                Single = true
            };
        }

        public virtual void AttachUpdate(T chat, Action<T, EntityEntry<T>> action)
        {
            if (chat.Id!=0 &&  db.Entry(chat).State==EntityState.Detached )
            {
            db.Set<T>().Attach(chat);
            }
            else
            {
                db.Set<T>().Add(chat);

            }

            action(chat,db.Entry(chat));
        }

        public virtual async Task SaveChangesAsync()
        {
            await db.SaveChangesAsync();
        }

        public virtual void SaveChanges()
        {
             db.SaveChanges();
        }

        public void Delete(List<T> deletedChats)
        {
            var table= db.Set<T>();

            var arr = deletedChats.Select(c => c.Id).ToArray();
            var deleted= table.Where(t=>arr.Contains(t.Id));

            if (deleted.Count()!=deletedChats.Count)
            {
                throw new Exception("یکی یا بعضی از دیتای ارسالی برای حذف ، در دیتابیس موجود نیست");
            }
            
            
            table.RemoveRange(deleted);
            db.SaveChanges();
        }

        public void Delete(IQueryable<T> deletedChats)
        {
            var table= db.Set<T>();

            var toRemove = table.Where(t => deletedChats.Select(d => d.Id).Contains(t.Id));
            table.RemoveRange(toRemove);
        }
    }

    public class NotFoundExeption : Exception
    {
        public NotFoundExeption(string msg):base(msg)
        {
        }
    }
}