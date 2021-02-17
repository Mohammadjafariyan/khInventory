﻿using System;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using SignalRMVCChat.Areas.sysAdmin.Service;
using SignalRMVCChat.Models.autoGeneratedContext;
using SignalRMVCChat.Service;
using TelegramBotsWebApplication.Areas.Admin.Controllers;

namespace my_webapp.Controllers
{
    
    public class DistribController:GenericController<Distribution>
    {
        public DistribController(DistributionService DistributionService)
        {
            Service = DistributionService; //SignalRMVCChat.DependencyInjection.Injector.Inject<DistributionService>();
        }



        public IActionResult ChangeColumn(int id, string val, string name)
        {
            var record= Service.GetById(id).Single;
            
            
            PropertyInfo prop = record.GetType().GetProperty(name, BindingFlags.Public | BindingFlags.Instance);
            if(null != prop && prop.CanWrite)
            {
                /*if (prop.PropertyType == typeof(int))
                {
                    prop.SetValue(record, val, null);
                    
                }else if (prop.PropertyType == typeof(double))
                {

                }
                else
                {
                    prop.SetValue(record, val, null);

                }*/
                
                Type t = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;

                object safeValue = (val == null) ? null : Convert.ChangeType(val, t);

                
                prop.SetValue(record, safeValue, null);

            }


            Service.Save(record);
            return Ok();
        }
    }
}