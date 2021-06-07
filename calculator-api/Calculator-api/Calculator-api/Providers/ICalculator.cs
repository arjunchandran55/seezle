using System.Threading.Tasks;
using Calculator_api.Models;

namespace Calculator_api.Providers
{
    public interface ICalculator
    {
        Task<CalculatorResponse> Calculate(string expression);
    }
}