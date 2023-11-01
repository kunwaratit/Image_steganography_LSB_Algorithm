# EnDecrypt
# encryptor.py
from Crypto.Cipher import AES
from Crypto import Random
import os
from django.conf import settings
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes
from base64 import b64encode, b64decode


class Encryptor:

    def __init__(self, key):
        self.key = key

    def pad(self, s):
        return s + b"\0" * (AES.block_size - len(s) % AES.block_size)

    def encrypt(self, message, key):
        message = self.pad(message)
        print(message)
        key = key.encode('utf-8')

        # iv = Random.new().read(AES.block_size)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return iv + cipher.encrypt(message)

    def encrypt_file(self, uploaded_file, encrypted_file_id):
        print('hello')
        with open(uploaded_file, 'rb') as fo:
            plaintext = fo.read()
        enc = self.encrypt(plaintext, self.key)
        encrypted_file_path = os.path.join(
            'media', 'encrypted_files', f'{encrypted_file_id}.enc')
        with open(encrypted_file_path, 'wb') as fo:
            fo.write(enc)
            print(f'atit{enc}')
        print(f"encrypted_file_path:{encrypted_file_path}")
        return enc,encrypted_file_path
    # rypted_file_path
