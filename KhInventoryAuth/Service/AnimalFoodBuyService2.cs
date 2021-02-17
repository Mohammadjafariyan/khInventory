using System;
using System.Collections.Generic;
using System.Linq;
using KhInventoryAuth.sysAdmin.Service;
using Microsoft.EntityFrameworkCore;
using my_webapp.Model;
using SignalRMVCChat.Areas.sysAdmin.Service;
using TelegramBotsWebApplication;
using TelegramBotsWebApplication.Areas.Admin.Models;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace my_webapp.Service
{
    public class AnimalFoodBuyService: GenericServiceSafeDelete<AnimalFoodBuy>
    {
        private readonly AnimalFoodService _animalFoodService;

        public AnimalFoodBuyService(GenericSafeDeleteImp<AnimalFoodBuy> Impl,
        AnimalFoodService animalFoodService) : base(Impl)
        {
            this._animalFoodService = animalFoodService;
        }

        public override MyEntityResponse<bool> DeleteById(int id)
        {
            return base.DeleteById(id);
        }

        internal MyDataTableResponse<AnimalFoodBuy> GetAllByAnimalFoodId(int animalFoodId, int? take, int? skip)
        {
            
           var query= GetQuery().Where(q=>q.AnimalFoodId==animalFoodId);


int total=query.Count();
           query= MyUtility.AsPaging<AnimalFoodBuy>(query,take,skip);

             return new MyDataTableResponse<AnimalFoodBuy>
            {
                Total=total,
                LastTake = take>0 ? take.Value : MyGlobal.PagingCount,
                LastSkip = skip,
                EntityList =  query.ToList(),
            };
        }

        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }

        public override MyDataTableResponse<AnimalFoodBuy> GetAll()
        {
            return base.GetAll();
        }

        public override MyDataTableResponse<AnimalFoodBuy> GetAsPaging(int take, int? skip, int? dependId)
        {
            return base.GetAsPaging(take, skip, dependId);
        }

        public override MyEntityResponse<AnimalFoodBuy> GetById(int id, string notFoundMsg = null)
        {
            return base.GetById(id, notFoundMsg);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override List<AnimalFoodBuy> GetMocklist()
        {
            return base.GetMocklist();
        }

        public override IQueryable<AnimalFoodBuy> GetQuery()
        {
            return base.GetQuery().Include(q=>q.AnimalFood);
        }





        /// <summary>
        /// خرید یا ورود به انبار
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override MyEntityResponse<int> Save(AnimalFoodBuy model)
        {

            //vl
            if (model.Quan <= 0 ||
            model.PerUnitPrice <= 0 ||
            model.TotalPrice <= 0)
            {
                throw new System.Exception("مقادیر فرم اشتباه است");
            }

            //set:تاریخ خرید
            model.DateTime = DateTime.Now;

            //vl
            var animalFood =_animalFoodService. GetById(model.AnimalFoodId).Single;


            //bs:به موجودی آنبار آن نهاده اضافه می کند
            animalFood.Remain += model.Quan;
            this._animalFoodService.Save(animalFood);


            return base.Save(model);
        }

        public override string ToString()
        {
            return base.ToString();
        }

        protected override IQueryable<AnimalFoodBuy> FilterDependIdForPagingHelper(IQueryable<AnimalFoodBuy> entities, int value, out dynamic dependEntity)
        {
            return base.FilterDependIdForPagingHelper(entities, value, out dependEntity);
        }

        protected override IQueryable<AnimalFoodBuy> IncludeForGetAsPagingHelper(IQueryable<AnimalFoodBuy> entities)
        {
            return base.IncludeForGetAsPagingHelper(entities);
        }
    }
}