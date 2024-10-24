import random
from sympy import isprime, mod_inverse

# Generate a random prime number
def generate_prime():
    while True:
        num = random.randint(100, 200)
        if isprime(num):
            return num

# Generate RSA keys
def generate_keys():
    p = generate_prime()
    q = generate_prime()
    
    n = p * q
    phi = (p - 1) * (q - 1)

    # Choose e
    e = 3
    while e < phi:
        if gcd(e, phi) == 1:
            break
        e += 2

    # Calculate d
    d = mod_inverse(e, phi)

    return (e, n), (d, n)  # Public key (e, n), Private key (d, n)

# Compute gcd
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

# Encrypt a message
def encrypt_message(public_key, plaintext):
    e, n = public_key
    encrypted = [pow(ord(char), e, n) for char in plaintext]
    return encrypted

# Decrypt a message
def decrypt_message(private_key, ciphertext):
    d, n = private_key
    decrypted = ''.join(chr(pow(char, d, n)) for char in ciphertext)
    return decrypted

# Example usage
if __name__ == "__main__":
    # Generate keys
    public_key, private_key = generate_keys()

    # Sample message
    message = "HELLO"
    
    # Encrypt the message
    encrypted_message = encrypt_message(public_key, message)
    print("Encrypted message:", encrypted_message)

    # Decrypt the message
    decrypted_message = decrypt_message(private_key, encrypted_message)
    print("Decrypted message:", decrypted_message)
  
