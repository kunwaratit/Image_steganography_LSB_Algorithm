# encryptor.py
from Crypto.Cipher import AES
from Crypto import Random
import os


class Encryptor:
    # ... (same as your existing code)
    def __init__(self, key):
        self.key = key

    def pad(self, s):
        return s + b"\0" * (AES.block_size - len(s) % AES.block_size)

    def encrypt(self, message, key):
        message = self.pad(message)
       # key = key.encode('utf-8')

        iv = Random.new().read(AES.block_size)
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return iv + cipher.encrypt(message)

    def encrypt_file(self, uploaded_file):
        plaintext = uploaded_file.read()
        enc = self.encrypt(plaintext, self.key)

        encrypted_file_path = os.path.join(
            'media', 'encrypted_files', uploaded_file.name + ".enc")
        with open(encrypted_file_path, 'wb') as fo:
            fo.write(enc)

        return encrypted_file_path
