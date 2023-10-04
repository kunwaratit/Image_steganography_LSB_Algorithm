# EnDecrypt
# decryptor.py
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import os


class Decryptor:
    def __init__(self, key):
        self.key = key.encode('utf-8')
        print(f"hh:{self.key}")

    def pad(self, s):
        return s + b"\0" * (AES.block_size - len(s) % AES.block_size)

    def decrypt(self, enc, key):
        iv = enc[:AES.block_size]

        # key = key.encode('utf-8')

        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        try:
            decrypted_data = (cipher.decrypt(
                enc[AES.block_size:]))
            return decrypted_data.rstrip(b"\0")
        except ValueError as e:
            print(f"Error during decryption: {str(e)}")
            return None

    def decrypt_file(self, encrypted_file_path):
        print(f"fos:{encrypted_file_path}")

        with open(encrypted_file_path, 'rb') as encrypted_file:
            enc = encrypted_file.read()
            try:
                key = self.key

                decrypted_data = self.decrypt(enc, key)

                if decrypted_data is not None:
                    return decrypted_data
                else:
                    print("Decryption failed or returned None.")
                    return None
            except Exception as e:
                print(f"Error during decryption: {str(e)}")
                return None
