using SQLite.CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DeviceGRUD.DataAccess
{
    public class DeviceContext:DbContext
    {
        public virtual DbSet<Models.Device> Devices { get; set; }

        public DeviceContext() : base("DefaultConnection") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var sqliteConnectionInitializer = new SqliteCreateDatabaseIfNotExists<DeviceContext>(modelBuilder);
            Database.SetInitializer(sqliteConnectionInitializer);
        }
    }
}