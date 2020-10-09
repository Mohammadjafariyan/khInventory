using System.Collections.Generic;
using TelegramBotsWebApplication.Areas.Admin.Service;

namespace my_webapp.Model
{
    public class AnimalFood:EntitySafeDelete
    {
        public string Name { get; set; }
        public int PerUnitPrice { get; set; }


        public string Image { get; set; }
 
        public int Remain { get; set; }
        /// <summary>
        /// حواله ها
        /// </summary>
        /// <value></value>
        public List<IssueAssignment> IssueAssignments { get; set; }
        public List<Model.AnimalFoodBuy> AnimalFoodBuys { get; set; }
        public int PerCustomerTotalMalQouta { get; set; }
    }
}