using DeviceGRUD.DataAccess;
using DeviceGRUD.Interface;
using DeviceGRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DeviceGRUD.Controllers
{
    public class HomeController : Controller
    {
        static readonly IRepository<Device> db = new DeviceRepository();
        public ActionResult Index()
        {            
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
