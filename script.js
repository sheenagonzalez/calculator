const display = document.querySelector('.display');
const digits = '0123456789';
const operators = '+-*/';
let currNumber = '';
let inputs = [];

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(numA, operator, numB) {
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

// TODO: Order of operations - perform multiplication/division then addition/subtraction from left to right
// TODO: Fix bug when there's a single input without operator to output itself
function operateOnInputs(inputs) {
  let ans = inputs.reduce((obj, input) => {
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
  })
  return ans;
}

// Handle button events and parse inputs
function handleNumber(key) {
  if (currNumber === '0' || display.textContent === '0') {
    currNumber = key;
    display.textContent = display.textContent.slice(0, -1) + key;
  } else {
    currNumber += key;
    display.textContent += key;
  }
}

function handleOperator(key) {
  inputs.push(+currNumber);
  inputs.push(key);
  currNumber = '';
  display.textContent += key;
}

function handleBackspace() {
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
}

function handleClear() {
  display.textContent = 0;
  inputs = [];
  currNumber = '';
}

function handleEquals() {
  if (operators.includes(inputs[inputs.length - 1])) {
    if (currNumber) {
      inputs.push(+currNumber);
    } else {
      inputs.pop();
    }
  }
  let ansString = operateOnInputs(inputs).total.toString();
  currNumber = ansString;
  display.textContent = ansString;
  inputs = [ansString];
}

// Add event listeners to each calculator button that calls the appropriate handler function
const keyButtons = [...(document.querySelectorAll('.key'))];
keyButtons.map((keyBtn) => {
  keyBtn.addEventListener('click', (e) => { 
    const key = e.target.getAttribute('data-key');
    if (digits.includes(key) || (key === '.' && !currNumber.includes('.'))) {
      handleNumber(key);
    } else if (operators.includes(key) && currNumber) {
      handleOperator(key);
    } else if (key === 'Backspace') {
      handleBackspace();
    } else if (key === 'Escape') {
      handleClear();
    } else if (key === '=') {
      handleEquals();
    }
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