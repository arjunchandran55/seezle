using System.Collections.Generic;
using Calculator_api.Models;
using Calculator_api.Providers;
using Calculator_api.Providers.BasicCalculator;
using Xunit;

namespace Calculator_api_tests
{
    public class CalculatorApiTest
    {
        [Fact]
        public async void SumExpression_returns_correct_value()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("1+2");
            var expectedResult = "3";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }
        
        [Fact]
        public async void SubtractExpression_returns_correct_value()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("2-1");
            var expectedResult = "1";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }
        
        [Fact]
        public async void DivisionExpression_returns_correct_value()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("2/1");
            const string expectedResult = "2";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }
        
        [Fact]
        public async void MultiplicationExpression_returns_correct_value()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("2*2");
            const string expectedResult = "4";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }
        
        [Fact]
        public async void NestedExpression_returns_correct_value()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("1+2+3/2*2");
            const string expectedResult = "6";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }
        
        [Fact]
        public async void NestedExpression_with_single_decimal_values_returns_correct_result()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("1+2.5+3.5/2.0*2.0");
            const string expectedResult = "7";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }
        
        [Fact]
        public async void NestedExpression_with_multiple_decimal_values_returns_correct_result()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("1+2.51+3.523/2.02*2.02");
            const string expectedResult = "7.0329999999999995";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }

        [Fact]
        public async void NestedSumExpression_returns_correct_value()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("1+2+1+3");
            const string expectedResult = "7";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }
        
        [Fact]
        public async void Divide_by_zero_returns_correct_message()
        {
            var basicCalculatorProvider = new CalculatorProvider().Provide(CalculatorType.Basic);
            var result = await basicCalculatorProvider.Calculate("1+2.51+3.523/0*2.02");
            const string expectedResult = "Cannot divide by zero!";
            Assert.Equal(result.ExpressionResult, expectedResult);
        }
        
        
        [Fact]
        public void TestCalculateFunction_For_List()
        {
            var expressionList = new List<string> {"1","+","2","/","2"};
            var result = new BasicCalculatorProvider().EvaluateExpressionList(expressionList,0, 0);
            const double expectedResult = 2;
            Assert.Equal(result, expectedResult);
        }
    }
}