using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SessionSample.Models;
using System.Diagnostics;

namespace SessionSample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        //Using Session
        private readonly ISession _session;
        public HomeController(ILogger<HomeController> logger, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _session = httpContextAccessor.HttpContext.Session;
        }

        public IActionResult Index()
        {
            // Store data in session
            _session.SetString("UserName", "JohnDoe");
            // Retrieve data from session
            var userName = _session.GetString("UserName");
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
