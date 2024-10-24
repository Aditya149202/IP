#pip install pycryptodome
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Random import get_random_bytes

# RSA Key Generation
key = RSA.generate(2048)  # Generate a 2048-bit RSA key pair
private_key = key.export_key()
public_key = key.publickey().export_key()

# Print public and private keys
print("Public Key:", public_key.decode())
print("Private Key:", private_key.decode())

# Encryption
cipher_rsa = PKCS1_OAEP.new(key.publickey())  # PKCS1_OAEP is the padding scheme used
message = b'This is a secret message!'
ciphertext = cipher_rsa.encrypt(message)
print("Ciphertext:", ciphertext)

# Decryption
cipher_rsa = PKCS1_OAEP.new(key)
decrypted_message = cipher_rsa.decrypt(ciphertext)
print("Decrypted message:", decrypted_message)
