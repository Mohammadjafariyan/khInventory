using System.Net.Http;
using System.Threading.Tasks;

namespace SignalRMVCChat.Areas.Customer.Service
{
    public class SmsService
    {
        
        private HttpClient client = new HttpClient();

        /**/
        public async Task SendSms(string to,string text)
        {

            string path =
                $@"http://www.0098sms.com/sendsmslink.aspx?FROM=50002224032&TO={to}&TEXT={text}&USERNAME=zsms5828
&PASSWORD=95919285&DOMAIN=0098";
            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode)
            {

                string resp= await response.Content.ReadAsStringAsync();
                //   product = await response.Content.ReadAsAsync<Product>();
            }
        }
    }
}