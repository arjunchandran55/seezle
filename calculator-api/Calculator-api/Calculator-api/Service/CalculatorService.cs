using System.Threading.Tasks;
using AutoMapper;
using Calculator_api.Models;
using Calculator_api.Providers;
using Microsoft.Extensions.Logging;

namespace Calculator_api.Service
{
    public class CalculatorService: ICalculatorService
    {
        private ILogger<CalculatorService> _logger;
        private readonly ICalculatorProvider _calculatorProvider;

        public CalculatorService(ILogger<CalculatorService> logger, ICalculatorProvider calculatorProvider)
        {
            _logger = logger;
            _calculatorProvider = calculatorProvider;
        }
        public async Task<CalculatorResponse> EvaluateExpression(string expression)
        {
            return await _calculatorProvider.Provide(CalculatorType.Basic).Calculate(expression);
        }
    }
}