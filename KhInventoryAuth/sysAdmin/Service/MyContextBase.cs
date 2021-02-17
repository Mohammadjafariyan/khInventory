using System;
using System.Data.Common;
using System.Data.Entity;
using System.Threading.Tasks;
using Engine.SysAdmin.Service;
using Microsoft.EntityFrameworkCore;
using SignalRMVCChat.Models;

namespace Engine.SysAdmin.Service
{
   

    public class MyContextBase : DbContext
    {

        
        /// <summary>
        /// for big db creation
        /// </summary>
        /// <param name="modelBuilder"></param>
        public virtual  void OnModelCreatingPublic(ModelBuilder modelBuilder)
        {
            OnModelCreating(modelBuilder);
        }

        
     



     

    
    }
}