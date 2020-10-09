using Engine.SysAdmin.Service;
using Microsoft.EntityFrameworkCore;

namespace SignalRMVCChat.Models.autoGeneratedContext
{
   

    public partial class TaavoniKhosrowshahDbContext : MyContextBase
    {
      

        public virtual DbSet<Distribution> Distributions { get; set; }
        public virtual DbSet<MalInfos> MalInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        /*public TaavoniKhosrowshahDbContext() : base("Model14")
        {
           // Database.SetInitializer(new MigrateDatabaseToLatestVersion<TaavoniKhosrowshahDbContext,Configuration>());
        }*/
    }
}