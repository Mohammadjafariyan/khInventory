using System;
using IdentityServer4.AspNetIdentity;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using KhInventoryAuth.Data;
using KhInventoryAuth.Models;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using my_webapp.Model;
using my_webapp.Service;
using Newtonsoft.Json.Serialization;

namespace KhInventoryAuth
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
            
            services.Configure<ApplicationDbContext>(o =>
            {
                // Make sure the identity database is created
                o.Database.Migrate();
            });
            
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
                options.HttpOnly = HttpOnlyPolicy.Always;
                options.Secure = CookieSecurePolicy.Always;
                // you can add more options here and they will be applied to all cookies (middleware and manually created cookies)
            });
            
            /*services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("KhInventoryContext")), 
                ServiceLifetime.Transient);*/

            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer() .AddApiAuthorization<IdentityUser, ApplicationDbContext>();


            services.AddAuthentication()
                .AddCookie(setup =>
                {
                    setup.Cookie.Name = "MyCookie";
                    setup.SlidingExpiration = false;
                    setup.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
                    setup.Cookie.SameSite = SameSiteMode.None;
                })
                .AddIdentityServerJwt();

            services.AddControllersWithViews()
                .AddNewtonsoftJson(x =>
            
                {
                    x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    x.SerializerSettings.ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new DefaultNamingStrategy()
                    };
                }).AddRazorRuntimeCompilation();

            services.AddRazorPages();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            
            DI.Config(services);

            services.AddDbContext<KhInventoryDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("KhInventoryContext")));
            
            
            services.Configure<IdentityOptions>(options =>
            {
                // Default Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 0;
            });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseDatabaseErrorPage();

            try
            {
                KhInventoryDbContext.UpdateDatabase(app);
            }
            catch (Exception e)
            {
                //ignore
            }

            
            if (env.IsDevelopment())
            {
              
            }
            else
            {
                /*app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();*/
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            
            app.UseExceptionHandler("/error"); // Add this
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
