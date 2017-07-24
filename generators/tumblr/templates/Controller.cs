using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace <%= projectNamespace %>.Controllers
{
    public class <%= controllerName %>Controller : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}
