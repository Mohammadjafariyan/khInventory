using System;
using Microsoft.Extensions.DependencyInjection;
using SignalRMVCChat.Areas.Customer.Service;
using SignalRMVCChat.Areas.sysAdmin.Service;
using SignalRMVCChat.Service;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace my_webapp.Service
{
    public class DI
    {
        public static void Config(IServiceCollection services)
        {
            services.AddTransient<AnimalFoodService>();
            services.AddTransient<IssueAssignmentService>();
            services.AddTransient<PersonService>();

            
            services.AddTransient<DistributionService>();
            services.AddTransient<MalinfoService>();
            services.AddTransient<MalInfoService>();
            services.AddTransient<SmsService>();
            
            

services.AddTransient( typeof(GenericImp<>));
services.AddTransient( typeof(GenericSafeDeleteImp<>));
services.AddTransient( typeof(GenericService<>));
services.AddTransient( typeof(GenericSingleImp<>));

            services.AddTransient<PersonService>();
            services.AddTransient<AnimalFoodService>();
            services.AddTransient<IssueAssignmentService>();
            services.AddTransient<AnimalFoodBuyService>();
            
            
            


        }
    }
}