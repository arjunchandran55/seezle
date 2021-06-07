using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Calculator_api.Models;

namespace Calculator_api.Providers.BasicCalculator
{
    public class BasicCalculatorProvider : ICalculator
    {
        public BasicCalculatorProvider()
        {

        }

        public Task<CalculatorResponse> Calculate(string expression)
        {
            double result = 0;
            try
            {
                var expressionList = GenerateExpressionList(expression);
                result = EvaluateExpressionList(expressionList, 0, 0);
            }
            catch (Exception ex) {
                return Task.FromResult(new CalculatorResponse
                {
                    ExpressionResult = ex.Message
                });
            }

            return Task.FromResult(new CalculatorResponse
            {
                ExpressionResult = Math.Round(result, 4).ToString(CultureInfo.InvariantCulture)
            });
        }

        private List<string> GenerateExpressionList(string expression)
        {
            List<string> expressionList = new List<string>();
            for (int i = 0; i < expression.Length; i++)
            {
                var currentValue = expression[i];
                if (currentValue == ' ') continue; // Skip spaces

                if (i == 0 && (currentValue == '*' || currentValue == '/')) throw new ArgumentException("Incorrect expression.");

                if (currentValue == '.') // handle decimal numbers
                {
                    var lastIndex = expressionList.Count - 1;
                    var prevNumber = "" + expressionList[lastIndex] + currentValue;
                    while (i + 1 < expression.Length && !IsOperator(expression[i + 1]))
                    {
                        prevNumber += expression[i + 1];
                        i += 1;
                    }

                    expressionList[lastIndex] = prevNumber;
                    continue;
                }
                
                // Current value is continuous digit or first element is a signed number
                if ((i > 0 && Char.IsDigit(expression[i - 1]) && !IsOperator(currentValue)) || (i == 1 && IsOperator(expression[i - 1]) && Char.IsDigit(currentValue)))
                {
                    expressionList[expressionList.Count - 1] += currentValue.ToString();
                    continue;
                }

                expressionList.Add(currentValue.ToString());
            }

            return expressionList;
        }

        public bool IsOperator(char c)
        {
            switch (c)
            {
                case '/':
                case '+':
                case '-':
                case '*': return true;
                default: return false;
            }
        }

        public double EvaluateExpressionList(List<string> expressions, int start, double result)
        {
            if (start >= expressions.Count || start + 2 > expressions.Count) return result;

            var firstOperand = result != 0 ? result.ToString() : expressions[start];
            var operation = expressions[start+1];
            var secondOperand = expressions[start + 2];

            switch (operation)
            {
                case "/":
                    if (Double.Parse(secondOperand) == 0) throw new ArgumentException("Cannot divide by zero!");
                    return EvaluateExpressionList(expressions, start+2, (Double.Parse(firstOperand) / Double.Parse(secondOperand)));
                
                case "+": return Double.Parse(firstOperand) + EvaluateExpressionList(expressions, start+2, Double.Parse(secondOperand));
                
                case "-": return Double.Parse(firstOperand) + EvaluateExpressionList(expressions, start+2, -Double.Parse(secondOperand));
                
                case "*": return EvaluateExpressionList(expressions, start+2, (Double.Parse(firstOperand) * Double.Parse(secondOperand)));
            }

            return 0;
        }
    }
}