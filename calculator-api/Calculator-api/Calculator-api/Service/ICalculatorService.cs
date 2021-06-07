using System.Threading.Tasks;
using Calculator_api.Models;

namespace Calculator_api.Service
{
    public interface ICalculatorService
    {
        Task<CalculatorResponse> EvaluateExpression(string expression);
    } 
}