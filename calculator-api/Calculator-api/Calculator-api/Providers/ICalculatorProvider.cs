using Calculator_api.Models;

namespace Calculator_api.Providers
{
    public interface ICalculatorProvider
    {
        ICalculator Provide(CalculatorType type);
    }
}