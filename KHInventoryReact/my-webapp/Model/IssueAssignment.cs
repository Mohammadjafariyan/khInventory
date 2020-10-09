﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using SignalRMVCChat.Models.autoGeneratedContext;
using TelegramBotsWebApplication;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace my_webapp.Model
{
    public class IssueAssignment:EntitySafeDelete
    {
        public IssueAssignment()
        {
            DateTime = DateTime.Now;
        }

        public AnimalFood AnimalFood { get; set; }
        public int AnimalFoodId { get; set; }
        public Distribution Person { get; set; }
        public int PersonId { get; set; }

        public int Quan { get; set; }

        public int TotalPrice { get; set; }

        public string BankFish { get; set; }

        public string Description { get; set; }
        
        public DateTime DateTime { get;  set; }

        [NotMapped]
        public string DateTimeIR { get{
            return MyGlobal.ToIranianDateWidthTime(DateTime);
        }  }
    }
}