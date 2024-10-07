// Generator function to produce prime numbers up to a specified limit
function* primeGenerator(limit) {
  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  }

  for (let num = 2; num <= limit; num++) {
    if (isPrime(num)) {
      yield num;
    }
  }
}

// Function to handle button click and display primes
document.getElementById("generate").addEventListener("click", () => {
  const limit = parseInt(document.getElementById("limit").value, 10);
  if (isNaN(limit) || limit <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  const list = document.getElementById("prime-list");
  list.innerHTML = ""; // Clear previous results

  const primes = primeGenerator(limit);
  for (const prime of primes) {
    const listItem = document.createElement("li");
    listItem.textContent = prime;
    list.appendChild(listItem);
  }
});
