using CoreAngular.Models;
using CoreAngular.Models.Item_Price_Groups;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace CoreAngular.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController : ControllerBase
    {
        private readonly ExternalSources _appSettings;
        private readonly HttpClient _httpClient;
        private Fields _Fields;
        private PriceItem _ItemPriceGroups;
        public HomeController(IOptions<ExternalSources> appSettings, HttpClient httpClient)
        {
            _appSettings = appSettings.Value;
            _httpClient = httpClient;
        }
        [HttpGet]
        [Route("GetData")]
        public async Task<ActionResult> GetDataAsync()
        {
            var response = await _httpClient.GetAsync(requestUri: _appSettings.HomeAPI);
            var json = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                _Fields = JsonConvert.DeserializeObject<Fields>(json);
                return Ok(_Fields.Data);
            }
            return BadRequest(new { message = "error in retrieving" });
        }
        [HttpGet]
        [Route("GetItemData")]
        public async Task<ActionResult> GetItemDataAsync(int id, int conId)
        {
            var splitLink = _appSettings.ItemAPI.Split("{id}");
            var NewLink = splitLink[0] + id + splitLink[1].Replace("{conId}", conId.ToString());
            var response = await _httpClient.GetAsync(requestUri: new Uri(NewLink));
            var json = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                _ItemPriceGroups = JsonConvert.DeserializeObject<PriceItem>(json);
                return Ok(_ItemPriceGroups);
            }
            return BadRequest(new { message = "Incomplete request" });
        }
    }
}
