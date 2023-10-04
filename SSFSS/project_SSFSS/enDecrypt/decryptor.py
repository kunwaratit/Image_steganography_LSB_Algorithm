# encryptor.py
from Crypto.Cipher import AES
from Crypto import Random
import os


class Decryptor:
    def __init__(self, key):
        self.key = key.encode('utf-8')

    def decrypt(self, enc, key):
        key = key.encode('utf-8')
        iv = enc[:AES.block_size]
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return cipher.decrypt(enc[AES.block_size:])

    def decrypt_file(self, encrypted_file_path):
        with open(encrypted_file_path, 'rb') as encrypted_file:
            enc = encrypted_file.read()
            decrypted_data = self.decrypt(enc, self.key)
            return decrypted_data
