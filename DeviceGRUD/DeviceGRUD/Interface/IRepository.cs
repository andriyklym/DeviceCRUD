using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DeviceGRUD.Interface
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T GetById(Guid Id);
        T Add(T item);
        bool Update(T item);
        bool Delete(Guid Id);
    }
}