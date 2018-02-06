using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DeviceGRUD.Interface;
using DeviceGRUD.Models;

namespace DeviceGRUD.DataAccess
{
    public class DeviceRepository : IRepository<Models.Device>
    {
        DeviceContext db = new DeviceContext();
        public Device Add(Device item)
        {
            if (item != null)
            {
                db.Devices.Add(item);
                db.SaveChanges();
                return item;
            }
            else return null;
        }

        public bool Delete(Guid Id)
        {
            var toDelete = db.Devices.Find(Id);
            if (toDelete != null)
            {
                db.Devices.Remove(toDelete);
                db.SaveChanges();
                return true;
            }
            else return false;
        }

        public IEnumerable<Device> GetAll()
        {
            return db.Devices;
        }

        public Device GetById(Guid Id)
        {
            return db.Devices.Find(Id);
        }

        public bool Update(Device item)
        {
            if (item != null)
            {
                var toUpdate = db.Devices.Find(item.Id);
                if (toUpdate != null)
                {
                    toUpdate.Name = item.Name;
                    toUpdate.Category = item.Category;
                    db.SaveChanges();
                    return true;
                }
                else return false;
            }
            else return false;
        }
    }
}