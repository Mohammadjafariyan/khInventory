using System.ComponentModel.Design;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using my_webapp.Model;
using my_webapp.Service;
using Newtonsoft.Json.Serialization;
using SignalRMVCChat.DependencyInjection;

namespace my_webapp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddControllersWithViews()
            .AddNewtonsoftJson(x =>
            
            
            
             {
                 x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                 x.SerializerSettings.ContractResolver = new DefaultContractResolver
    {
       NamingStrategy = new DefaultNamingStrategy()
    };
             });
 

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            

               

DI.Config(services);


/*
string conString = Microsoft
    .Extensions
    .Configuration
    .ConfigurationExtensions
    .GetConnectionString(this.Configuration, "KhInventoryContext");*/

services.AddDbContext<KhInventoryDbContext>(options =>
    options.UseSqlServer(Configuration.GetConnectionString("KhInventoryContext")));
    //options.UseSqlite("Data Source=(localdb)\\MSSQLLocalDB;Database=KhosrowshahDb"));
//options.UseInMemoryDatabase("KhInventoryContext"));
            //options.UseSqlServer(Configuration.GetConnectionString("KhInventoryContext")));
            ;



    // Register the Swagger services
    services.AddSwaggerDocument();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            KhInventoryDbContext.UpdateDatabase(app);
                app.UseExceptionHandler("/Errors");
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
          

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });


             // Register the Swagger generator and the Swagger UI middlewares
    app.UseOpenApi();
   app.UseSwaggerUi3();

       // It should be one of your very first registrations
app.UseExceptionHandler("/error"); // Add this
app.UseEndpoints(endpoints => endpoints.MapControllers());

        }
    }
}
