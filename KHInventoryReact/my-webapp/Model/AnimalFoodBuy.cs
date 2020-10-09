using System.ComponentModel.DataAnnotations.Schema;
using System;
using TelegramBotsWebApplication.Areas.Admin.Service;
using TelegramBotsWebApplication;

namespace my_webapp.Model
{
    public class AnimalFoodBuy:EntitySafeDelete
    {
        public int PerUnitPrice { get; set; }
        public int TotalPrice { get; set; }
        public int Quan { get; set; }
 

        public AnimalFood AnimalFood{get;set;}
        public int AnimalFoodId{get;set;}

        public string Description { get; set; }
        public string Fish { get; set; }
        public DateTime DateTime { get;  set; }

        [NotMapped]
        public string DateTimeIR { get{
            return MyGlobal.ToIranianDateWidthTime(DateTime);
        }  }
    }
}