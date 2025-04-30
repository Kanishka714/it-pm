import math
import cmath
import statistics
from typing import Union, List
import re
from datetime import datetime

class AdvancedCalculator:
    """A sophisticated calculator with advanced mathematical operations and history tracking."""
    
    def __init__(self):
        self.history = []
        self.memory = 0.0
        self.constants = {
            'pi': math.pi,
            'e': math.e,
            'phi': (1 + math.sqrt(5)) / 2,
            'g': 9.80665  # acceleration due to gravity
        }
    
    def _log_operation(self, operation: str, result: Union[float, complex, str]) -> None:
        """Log the operation to history with timestamp."""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.history.append({
            'timestamp': timestamp,
            'operation': operation,
            'result': result
        })
    
    def basic_arithmetic(self, num1: float, num2: float, operator: str) -> float:
        """Perform basic arithmetic operations."""
        operations = {
            '+': lambda x, y: x + y,
            '-': lambda x, y: x - y,
            '*': lambda x, y: x * y,
            '/': lambda x, y: x / y if y != 0 else "Error: Division by zero",
            '^': lambda x, y: x ** y
        }
        
        if operator not in operations:
            return "Error: Invalid operator"
        
        result = operations[operator](num1, num2)
        self._log_operation(f"{num1} {operator} {num2}", result)
        return result
    
    def trigonometric(self, angle: float, func: str, is_degrees: bool = True) -> float:
        """Calculate trigonometric functions."""
        # Convert to radians if input is in degrees
        angle = math.radians(angle) if is_degrees else angle
        
        trig_functions = {
            'sin': math.sin,
            'cos': math.cos,
            'tan': math.tan,
            'asin': math.asin,
            'acos': math.acos,
            'atan': math.atan
        }
        
        if func not in trig_functions:
            return "Error: Invalid trigonometric function"
        
        try:
            result = trig_functions[func](angle)
            self._log_operation(f"{func}({angle})", result)
            return result
        except ValueError:
            return "Error: Invalid input for trigonometric function"
    
    def complex_operations(self, num1: complex, num2: complex, operator: str) -> complex:
        """Perform operations with complex numbers."""
        operations = {
            '+': lambda x, y: x + y,
            '-': lambda x, y: x - y,
            '*': lambda x, y: x * y,
            '/': lambda x, y: x / y if y != 0 else "Error: Division by zero",
            '^': lambda x, y: x ** y
        }
        
        if operator not in operations:
            return "Error: Invalid operator"
        
        result = operations[operator](num1, num2)
        self._log_operation(f"Complex: {num1} {operator} {num2}", result)
        return result
    
    def statistical_operations(self, numbers: List[float], operation: str) -> float:
        """Perform statistical calculations."""
        if not numbers:
            return "Error: Empty dataset"
        
        stats_functions = {
            'mean': statistics.mean,
            'median': statistics.median,
            'mode': statistics.mode,
            'stdev': statistics.stdev,
            'variance': statistics.variance
        }
        
        if operation not in stats_functions:
            return "Error: Invalid statistical operation"
        
        try:
            result = stats_functions[operation](numbers)
            self._log_operation(f"{operation}({numbers})", result)
            return result
        except statistics.StatisticsError:
            return "Error: Invalid data for statistical operation"
    
    def memory_operations(self, operation: str, value: float = None) -> Union[float, str]:
        """Manage calculator memory."""
        if operation == 'store' and value is not None:
            self.memory = value
            self._log_operation(f"Memory store: {value}", self.memory)
            return "Stored in memory"
        elif operation == 'recall':
            self._log_operation("Memory recall", self.memory)
            return self.memory
        elif operation == 'clear':
            self.memory = 0.0
            self._log_operation("Memory clear", self.memory)
            return "Memory cleared"
        return "Error: Invalid memory operation"
    
    def parse_expression(self, expression: str) -> Union[float, complex, str]:
        """Parse and evaluate mathematical expressions."""
        try:
            # Replace constants with their values
            for const, value in self.constants.items():
                expression = expression.replace(const, str(value))
            
            # Handle basic arithmetic
            if '+' in expression or '-' in expression or '*' in expression or '/' in expression:
                result = eval(expression, {"__builtins__": {}}, self.constants)
                self._log_operation(expression, result)
                return result
            
            # Handle functions
            func_match = re.match(r'(\w+)\(([^)]+)\)', expression)
            if func_match:
                func, arg = func_match.groups()
                arg = float(arg)
                
                if func in ['sin', 'cos', 'tan', 'asin', 'acos', 'atan']:
                    return self.trigonometric(arg, func)
                
                other_functions = {
                    'sqrt': math.sqrt,
                    'log': math.log,
                    'exp': math.exp,
                    'abs': abs
                }
                
                if func in other_functions:
                    result = other_functions[func](arg)
                    self._log_operation(expression, result)
                    return result
            
            return "Error: Invalid expression"
        except Exception as e:
            return f"Error: {str(e)}"
    
    def get_history(self) -> List[dict]:
        """Return calculation history."""
        return self.history
    
    def clear_history(self) -> str:
        """Clear calculation history."""
        self.history = []
        return "History cleared"

def main():
    calc = AdvancedCalculator()
    
    while True:
        print("\nAdvanced Calculator Menu:")
        print("1. Basic Arithmetic")
        print("2. Trigonometric Functions")
        print("3. Complex Numbers")
        print("4. Statistical Operations")
        print("5. Memory Operations")
        print("6. Expression Evaluation")
        print("7. View History")
        print("8. Clear History")
        print("9. Exit")
        
        choice = input("Enter choice (1-9): ")
        
        if choice == '1':
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))
            operator = input("Enter operator (+, -, *, /, ^): ")
            result = calc.basic_arithmetic(num1, num2, operator)
            print(f"Result: {result}")
        
        elif choice == '2':
            angle = float(input("Enter angle: "))
            func = input("Enter function (sin, cos, tan, asin, acos, atan): ")
            is_degrees = input("Is angle in degrees? (y/n): ").lower() == 'y'
            result = calc.trigonometric(angle, func, is_degrees)
            print(f"Result: {result}")
        
        elif choice == '3':
            num1 = complex(input("Enter first complex number (e.g., 3+4j): "))
            num2 = complex(input("Enter second complex number (e.g., 1-2j): "))
            operator = input("Enter operator (+, -, *, /, ^): ")
            result = calc.complex_operations(num1, num2, operator)
            print(f"Result: {result}")
        
        elif choice == '4':
            numbers = [float(x) for x in input("Enter numbers (space-separated): ").split()]
            operation = input("Enter operation (mean, median, mode, stdev, variance): ")
            result = calc.statistical_operations(numbers, operation)
            print(f"Result: {result}")
        
        elif choice == '5':
            operation = input("Enter operation (store, recall, clear): ")
            if operation == 'store':
                value = float(input("Enter value to store: "))
                result = calc.memory_operations(operation, value)
            else:
                result = calc.memory_operations(operation)
            print(f"Result: {result}")
        
        elif choice == '6':
            expression = input("Enter mathematical expression: ")
            result = calc.parse_expression(expression)
            print(f"Result: {result}")
        
        elif choice == '7':
            history = calc.get_history()
            for entry in history:
                print(f"{entry['timestamp']}: {entry['operation']} = {entry['result']}")
        
        elif choice == '8':
            result = calc.clear_history()
            print(result)
        
        elif choice == '9':
            print("Goodbye!")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()