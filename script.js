// Operator functions
const add = function addTwoNumbers(a, b) {
  return a + b;
}
const subtract = function subtractTwoNumbers(a, b) {
  return a - b;
}
const multiply = function multiplyTwoNumbers(a, b) {
  return a * b;
}
const divide = function divideTwoNumbers(a, b) {
  return a / b;
}
let numA, operator, numB;
const operate = function operateOnTwoNumbers(numA, operator, numB) {
  switch(operator) {
    case '+':
      return add(numA, numB);
    case '-':
      return subtract(numA, numB);
    case '*':
      return multiply(numA, numB);
    case '/':
      return divide(numA, numB);
  }
}

// Handle button events, parse inputs, perform operations and display answer
const display = document.querySelector('.display');
const digits = '0123456789';
const operators = '+-*/';
let currNumber = '';
let inputs = [];
let ans = 0;
const handleOperation = function handleCalculatorOperation(key) {
  if (digits.includes(key) || (key === '.' && !currNumber.includes('.'))) {
    // TODO: Replace leading zeroes
    currNumber += key;
    display.textContent = display.textContent === '0' ? key : display.textContent + key;
  } else if (operators.includes(key) && currNumber) {
    inputs.push(+currNumber);
    inputs.push(key);
    currNumber = '';
    display.textContent += key;
  } else if (key === '=') {
    if (operators.includes(inputs[inputs.length - 1])) {
      if (currNumber) {
        inputs.push(+currNumber);
      } else {
        inputs.pop();
      }
    }
    
    let sortedInputs = inputs.sort((a, b) => {
      // TODO: Order math operations MDAS
      return 0;
    });

    let ans = sortedInputs.reduce((obj, input) => {
      if (typeof input === 'number') {
        let total = operate(obj.total, obj.operator, input);
        obj.total = total;
      } else if (operators.includes(input)) {
        obj.operator = input;
      }
      return obj;
    }, {
      total: 0,
      operator: '+',
    }).total.toString();
    currNumber = ans;
    display.textContent = ans;
    inputs = [ans];
  } else if (key === 'Backspace') {
    if (display.textContent.length === 1) {
      display.textContent = 0;
      currNumber = '';
      inputs = [];
    } else {
      display.textContent = display.textContent.slice(0, -1);
      if (currNumber.length > 1) {
        currNumber = currNumber.slice(0, -1);
      } else if (currNumber.length === 1) {
        currNumber = '';
        inputs.pop();
      } else {
        currNumber = inputs[inputs.length - 1];
        inputs.pop();
      }
    }
  } else if (key === 'Escape') {
    display.textContent = 0;
    inputs = [];
    currNumber = '';
  }
}

// Add event listeners to each calculator button to perform its appropriate function when clicked
const keyButtons = [...(document.querySelectorAll('.key'))];
keyButtons.map((keyBtn) => {
  keyBtn.addEventListener('click', (e) => { 
    const key = e.target.getAttribute('data-key');
    handleOperation(key);
  })
})

// Allow keyboard support
window.addEventListener('keydown', function (e) {
  try {
    const key = (e.key === 'Enter') ? '=' : e.key;
    const keyBtn = document.querySelector(`.key[data-key='${key}']`);
    keyBtn.click();
  } catch (error) {
    // Do nothing if key pressed is not a valid input
  }
});