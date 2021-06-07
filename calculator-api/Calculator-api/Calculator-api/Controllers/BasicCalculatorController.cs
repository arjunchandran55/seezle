using System.Threading.Tasks;
using Calculator_api.Models;
using Calculator_api.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Calculator_api.Controllers
{
    [ApiController]
    [Route("basic-calculator")]
    public class BasicCalculatorController : ControllerBase
    {
        private readonly ILogger<BasicCalculatorController> _logger;
        private readonly ICalculatorService _calculatorService;

        public BasicCalculatorController(ILogger<BasicCalculatorController> logger, ICalculatorService calculatorService)
        {
            _logger = logger;
            _calculatorService = calculatorService;
        }

        [HttpGet]
        public Task<CalculatorResponse> Get([FromQuery] string expression)
        {
            return _calculatorService.EvaluateExpression(expression);
        }
    }
}