import hmac
import hashlib

# Define the key and message
key = b'secret_key'
message = b'This is a secure message.'

# Create an HMAC object using SHA-256
hmac_object = hmac.new(key, message, hashlib.sha256)

# Generate the HMAC digest (the message authentication code)
hmac_digest = hmac_object.hexdigest()

# Print the HMAC value
print(f"HMAC Digest: {hmac_digest}")

# Verifying HMAC:
# Suppose the receiver computes the HMAC for the same key and message
def verify_hmac(key, message, hmac_to_verify):
    new_hmac = hmac.new(key, message, hashlib.sha256).hexdigest()
    return hmac.compare_digest(new_hmac, hmac_to_verify)

# Check if the HMAC matches
is_valid = verify_hmac(key, message, hmac_digest)
print(f"Is HMAC valid? {is_valid}")
