// Declare variables to hold the iterator and user input numbers
let squaredIterator = null;
let currentSquare = null;
let maxSquares = 0;
let count = 0;

// Function to handle the submission of the number of squares to show
function handleCountSubmit() {
    const countInput = document.getElementById('countInput').value;
    maxSquares = parseInt(countInput, 10);

    if (isNaN(maxSquares) || maxSquares < 1) {
        alert('Please enter a valid number greater than 0.');
        return;
    }

    // Generate an array of numbers to square
    const numbers = Array.from({ length: maxSquares }, (_, i) => i + 1);

    // Create a new iterator based on the numbers
    squaredIterator = (function* (array) {
        for (const num of array) {
            yield num * num;
        }
    })(numbers);

    // Initialize the iterator
    currentSquare = squaredIterator.next();

    // Enable the "Get Next Square" button
    document.getElementById('nextSquare').disabled = false;
    document.getElementById('output').textContent = 'Press the button to get the first square number.';
}

// Function to handle button clicks for getting the next square number
function getNextSquare() {
    if (squaredIterator) {
        if (!currentSquare.done) {
            document.getElementById('output').textContent = `Next square number: ${currentSquare.value}`;
            currentSquare = squaredIterator.next(); // Update the iterator
        } else {
            document.getElementById('output').textContent = 'No more square numbers.';
            // Disable the button when done
            document.getElementById('nextSquare').disabled = true;
        }
    }
}

// Add event listeners to buttons
document.getElementById('submitCount').addEventListener('click', handleCountSubmit);
document.getElementById('nextSquare').addEventListener('click', getNextSquare);
