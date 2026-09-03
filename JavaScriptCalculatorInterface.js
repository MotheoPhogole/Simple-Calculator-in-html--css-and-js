//This code was created by NGWATLE MOTHEO PHOGOLE
// JavaScriptCalculatorInterface.js
    (function() {
      const display = document.getElementById('display');
      const buttons = document.querySelectorAll('button');
      let currentInput = '0';
      let previousInput = null;
      let operator = null;
      let resetNext = false;

      // Helper to update the display text safely
      function updateDisplay() {
        display.textContent = currentInput;
      }

      // Helper to append a number or decimal point
      function appendNumber(num) {
        if (resetNext) {
          currentInput = (num === '.') ? '0.' : num;
          resetNext = false;
        } else if (currentInput === '0' && num !== '.') {
          currentInput = num;
        } else if (num === '.' && currentInput.includes('.')) {
          // Prevent multiple decimals
          return;
        } else {
          currentInput += num;
        }
        updateDisplay();
      }

      // Helper to perform calculation
      function calculate() {
        if (previousInput === null || operator === null) return;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch(operator) {
          case '+':
            result = prev + current;
            break;
          case '-':
            result = prev - current;
            break;
          case '*':
            result = prev * current;
            break;
          case '/':
            if (current === 0) {
              alert("Error: Division by zero");
              result = prev;
            } else {
              result = prev / current;
            }
            break;
          case '^':
            result = Math.pow(prev, current);
            break;
          default:
            return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = null;
        resetNext = true;
        updateDisplay();
      }

      // Handler for operator keys
      function chooseOperator(op) {
        if (operator !== null) {
          // Calculate if operator pending
          calculate();
        }
        operator = op;
        previousInput = currentInput;
        resetNext = true;
      }

      // Clear all inputs
      function clearAll() {
        currentInput = '0';
        previousInput = null;
        operator = null;
        resetNext = false;
        updateDisplay();
      }

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.hasAttribute('data-number')) {
            appendNumber(btn.getAttribute('data-number'));
          } else if (btn.hasAttribute('data-operator')) {
            chooseOperator(btn.getAttribute('data-operator'));
          } else if (btn.id === 'equals') {
            calculate();
          } else if (btn.id === 'clear') {
            clearAll();
          }
        });
      });

      // Allow using keyboard for input (optional enhancement)
      window.addEventListener('keydown', (e) => {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
          appendNumber(e.key);
        } else if (['+', '-', '*', '/', '^'].includes(e.key)) {
          chooseOperator(e.key);
          e.preventDefault();
        } else if (e.key === 'Enter' || e.key === '=') {
          calculate();
          e.preventDefault();
        } else if(e.key === 'Escape') {
          clearAll();
          e.preventDefault();
        }
      });

      updateDisplay();
    })();
  