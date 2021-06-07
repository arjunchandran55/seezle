using System;
using Calculator_api.Models;
using Calculator_api.Providers.BasicCalculator;

namespace Calculator_api.Providers
{
    public class CalculatorProvider : ICalculatorProvider
    {
        public ICalculator Provide(CalculatorType type)
        {
            switch (type)
            {
                case CalculatorType.Basic: return new BasicCalculatorProvider();
                case CalculatorType.Advanced: throw new NotImplementedException();
            }

            return null;
        }
    }
}