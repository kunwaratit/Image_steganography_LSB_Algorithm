from PIL import Image

# Caesar cipher encryption function
def encrypt(text, shift):
    encrypted_text = ""
    for char in text:
        if char.isalpha():
            ascii_offset = ord('a') if char.islower() else ord('A')
            encrypted_char = chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
            encrypted_text += encrypted_char
        else:
            encrypted_text += char
    return encrypted_text

# Caesar cipher decryption function
def decrypt(text, shift):
    return encrypt(text, -shift)

# Function to convert text to binary
def text_to_binary(text):
    binary_data = ''.join(format(ord(char), '08b') for char in text)
    return binary_data

# Function to hide text in the least significant bit of each pixel value
def hide_text(image_path, text, output_path, encryption_shift):
    image = Image.open(image_path).convert('RGB')
    width, height = image.size
    encrypted_text = encrypt(text, encryption_shift)
    binary_text = text_to_binary(encrypted_text)
    text_length = len(binary_text)

    if text_length > width * height * 3:
        raise ValueError("Text is too large to hide in the image.")

    pixel_values = list(image.getdata())
    encoded_pixels = []

    text_index = 0
    for pixel in pixel_values:
        if text_index < text_length:
            binary_pixel = [bin(channel)[2:].zfill(8) for channel in pixel]
            for i in range(3):
                binary_pixel[i] = binary_pixel[i][:-1] + binary_text[text_index]
                text_index += 1
                if text_index >= text_length:
                    break
            encoded_pixels.append(tuple(int(channel, 2) for channel in binary_pixel))
        else:
            encoded_pixels.append(pixel)

    encoded_image = Image.new('RGB', image.size)
    encoded_image.putdata(encoded_pixels)
    encoded_image.save(output_path)

    print("Text hidden successfully in the image.")

# Function to extract hidden text from the least significant bit of each pixel value
def extract_text(image_path, encryption_shift):
    image = Image.open(image_path).convert('RGB')
    pixel_values = list(image.getdata())

    binary_text = ''
    for pixel in pixel_values:
        binary_pixel = [bin(channel)[2:].zfill(8) for channel in pixel]
        for i in range(3):
            binary_text += binary_pixel[i][-1]

    extracted_text = ''
    for i in range(0, len(binary_text), 8):
        byte = binary_text[i:i+8]
        extracted_text += chr(int(byte, 2))

    decrypted_text = decrypt(extracted_text, encryption_shift)

    return decrypted_text

# Example usage
image_path = "UCD.png"
output_path = "encoded_image.png"
hidden_text = "This is a hidden message."
encryption_shift = 3

# Hide the text in the image
hide_text(image_path, hidden_text, output_path, encryption_shift)

# Extract the hidden text from the encoded image
extracted_text = extract_text(output_path, encryption_shift)

# Print the extracted text
print("Extracted Text:", extracted_text)
