#include <iostream>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

// Function to generate the Playfair cipher key square
vector<vector<char>> generateKeyMatrix(string key) {
    vector<vector<char>> keyMatrix(5, vector<char>(5, ' '));
    vector<bool> used(26, false);
    used['J' - 'A'] = true; // 'I' and 'J' are treated the same in Playfair cipher
    
    // Fill the key matrix with unique characters from the key
    int row = 0, col = 0;
    for (char c : key) {
        c = toupper(c);
        if (!used[c - 'A']) {
            keyMatrix[row][col] = c;
            used[c - 'A'] = true;
            col++;
            if (col == 5) {
                col = 0;
                row++;
            }
        }
    }
    
    // Fill the remaining spaces with the rest of the alphabet
    for (char c = 'A'; c <= 'Z'; c++) {
        if (!used[c - 'A']) {
            keyMatrix[row][col] = c;
            col++;
            if (col == 5) {
                col = 0;
                row++;
            }
        }
    }
    
    return keyMatrix;
}

// Function to format the input by removing spaces and handling 'J'
string formatInput(string input) {
    string formatted;
    for (char c : input) {
        if (isalpha(c)) {
            c = toupper(c);
            if (c == 'J') {
                c = 'I'; // Replace 'J' with 'I'
            }
            formatted += c;
        }
    }
    
    // Insert 'X' between duplicate letters in a digraph
    for (size_t i = 0; i < formatted.length(); i += 2) {
        if (i + 1 == formatted.length() || formatted[i] == formatted[i + 1]) {
            formatted.insert(i + 1, "X");
        }
    }
    
    if (formatted.length() % 2 != 0) {
        formatted += 'X'; // Pad with 'X' if the length is odd
    }
    
    return formatted;
}

// Function to find the position of a letter in the key matrix
void findPosition(vector<vector<char>>& keyMatrix, char c, int& row, int& col) {
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            if (keyMatrix[i][j] == c) {
                row = i;
                col = j;
                return;
            }
        }
    }
}

// Encrypts a pair of characters using the Playfair cipher rules
string encryptPair(vector<vector<char>>& keyMatrix, char a, char b) {
    int rowA, colA, rowB, colB;
    findPosition(keyMatrix, a, rowA, colA);
    findPosition(keyMatrix, b, rowB, colB);

    if (rowA == rowB) {
        // Same row: move to the right
        return string(1, keyMatrix[rowA][(colA + 1) % 5]) + keyMatrix[rowB][(colB + 1) % 5];
    } else if (colA == colB) {
        // Same column: move down
        return string(1, keyMatrix[(rowA + 1) % 5][colA]) + keyMatrix[(rowB + 1) % 5][colB];
    } else {
        // Rectangle: swap columns
        return string(1, keyMatrix[rowA][colB]) + keyMatrix[rowB][colA];
    }
}

// Function to encrypt the input text using the Playfair cipher
string encrypt(string input, string key) {
    vector<vector<char>> keyMatrix = generateKeyMatrix(key);
    string formattedInput = formatInput(input);
    string encryptedText;
    
    for (size_t i = 0; i < formattedInput.length(); i += 2) {
        encryptedText += encryptPair(keyMatrix, formattedInput[i], formattedInput[i + 1]);
    }
    
    return encryptedText;
}

int main() {
    string key, plaintext;
    
    cout << "Enter key: ";
    getline(cin, key);
    
    cout << "Enter plaintext: ";
    getline(cin, plaintext);
    
    string ciphertext = encrypt(plaintext, key);
    cout << "Encrypted text: " << ciphertext << endl;
    
    return 0;
}
