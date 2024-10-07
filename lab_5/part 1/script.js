function calculate(a, b, operation) {
  return new Promise((resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return reject("Both arguments must be numbers.");
    }

    switch (operation) {
      case "add":
        resolve(a + b);
        break;
      case "subtract":
        resolve(a - b);
        break;
      case "multiply":
        resolve(a * b);
        break;
      case "divide":
        if (b === 0) {
          reject("Division by zero is not allowed.");
        } else {
          resolve(a / b);
        }
        break;
      default:
        reject(
          'Invalid operation. Use "add", "subtract", "multiply", or "divide".'
        );
    }
  });
}

document
  .getElementById("calculator-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;

    calculate(num1, num2, operation)
      .then((result) => {
        document.getElementById("result").textContent = `Result: ${result}`;
      })
      .catch((err) => {
        document.getElementById("result").textContent = `Error: ${err}`;
      });
  });
