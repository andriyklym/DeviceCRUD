using DeviceGRUD.DataAccess;
using DeviceGRUD.Interface;
using DeviceGRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DeviceGRUD.Controllers
{
    public class DevicesController : ApiController
    {
        static readonly IRepository<Device> db = new DeviceRepository();
        // GET api/values
        public IEnumerable<Device> GetAll()
        {
            return db.GetAll();
        }

        // GET api/values/5
        public Device Get(Guid id)
        {
            return db.GetById(id);
        }

        [HttpPost]
        // POST api/values
        public Device Post(Device item)
        {
            item.Id = Guid.NewGuid();
            return db.Add(item);
        }

        [HttpPut]
        // PUT api/values/5
        public IEnumerable<Device> Put(Guid id, Device item)
        {
            if (item != null)
            {
                item.Id = id;
                if (db.Update(item))
                {
                    return db.GetAll();
                }
                else return null;
            }
            else return null;
        }

        [HttpDelete]
        // DELETE api/values/5
        public bool Delete(Guid id)
        {
            if (db.Delete(id))
            {
                return true;
            }
            else return false;
        }
    }
}
