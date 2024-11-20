const display = document.querySelector('.display');
const digits = '0123456789';
const operators = '+-*/';
let currNumber = '0';
let inputs = [0];

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

// Given an array of inputs, perform operations in order and return answer
function operateOnInputs(inputs) {
  if (inputs.length < 3) {
    return +currNumber;
  } else {
    // Perform any multiplication/division first
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      if (input === '*' || input === '/') {
        let ans = operate(inputs[i - 1], input, inputs[i + 1]);
        inputs = inputs.slice(0, i - 1).concat(inputs.slice(i + 2));
        inputs[i - 1] = ans;
        i -= 2;
      }
    }
    // Perform any addition/subtraction last
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      if (input === '+' || input === '-') {
        let ans = operate(inputs[i - 1], input, inputs[i + 1]);
        inputs = inputs.slice(0, i - 1).concat(inputs.slice(i + 2));
        inputs[i - 1] = ans;
        i -= 2;
      }
    }
    return inputs[0];
  }
}

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
  } else if (currNumber) {
    inputs.push(+currNumber);
  }
  let ans = operateOnInputs(inputs);
  let ansString = ans.toString();
  currNumber = ansString;
  display.textContent = ansString;
  inputs = [];
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