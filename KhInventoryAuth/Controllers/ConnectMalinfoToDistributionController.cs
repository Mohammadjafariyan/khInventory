﻿using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_webapp.Model;
using SignalRMVCChat.Models.autoGeneratedContext;
using SignalRMVCChat.Service;

namespace my_webapp.Controllers
{
    public class ConnectMalinfoToDistributionController : Controller
    {
        private readonly DistributionService _distributionService;
        private readonly MalinfoService _malInfoService;

        private readonly KhInventoryDbContext db;

        public ConnectMalinfoToDistributionController(DistributionService
            distributionService, MalinfoService malInfoService,
            KhInventoryDbContext _db)
        {
            db = _db;
            _distributionService = distributionService;
            _malInfoService = malInfoService;
        }


        [HttpPost]
        public IActionResult Save(int disId, int malId)
        {
            if (disId==0 || malId==0)
            {
                throw new Exception("لطفا به دقت انتخاب نمایید انتخاب نشده است");
            }
            var mal = _malInfoService.GetById(malId);
            var dis = _distributionService.GetById(disId);

            if (mal.Single.DistributionId.HasValue)
            {
                throw new Exception("این مورد قبلا زده شده است");
            }
            
            mal.Single.DistributionId = disId;

            _malInfoService.Save(mal.Single);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Index()
        {
            db.Database.Migrate();
                var malinfos = db.MalInfos.Where(d => d.DistributionId.HasValue == false).ToList();

                var distributions = db.Distributions
                    .Where(d=>!db.MalInfos.Where(m => m.DistributionId.HasValue == true)
                        .Select(m=>m.DistributionId).Contains(d.Id)).ToList();



                var joined = malinfos.Join(distributions, infos => infos.NameDamdar.Trim(),
                    distribution => distribution.NamVaNameKhanevadegi.Trim(),(infos, distribution) => 
                        new {infos,distribution}).ToList();

                foreach (var ajoin in joined)
                {
                    if (ajoin.infos.DistributionId.HasValue==false)
                    {
                        ajoin.infos.DistributionId = ajoin.distribution.Id;
                    
                        db.Entry(ajoin.infos).Property(p => p.DistributionId).IsModified = true;
                    }
                  
                }

                db.SaveChanges();
               
                
                return View((malinfos, distributions));
        }

        public IActionResult AddedList()
        {
                var malinfos =
                    (from m in db.MalInfos
                        join d in db.Distributions on m.DistributionId equals d.Id
                        select new MalinfosViewModel {malinfo = m, distribution = d}).ToList();

                return View(malinfos);
        }

        [HttpPost]
        public IActionResult Delete(int malId)
        {
            var mal = _malInfoService.GetById(malId);

            mal.Single.DistributionId = null;
            

            _malInfoService.Save(mal.Single);
            return RedirectToAction("Index");
        }
    }

    public class MalinfosViewModel
    {
        public MalInfos malinfo { get; set; }
        public Distribution distribution { get; set; }
    }
}