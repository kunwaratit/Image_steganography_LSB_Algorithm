from PIL import Image
import base64
# Function to convert a byte to 8-bit binary
def byte_to_bin(byte):
    binary = bin(byte)[2:]
    return '0' * (8 - len(binary)) + binary

# Function to convert 8-bit binary to a byte
def bin_to_byte(binary):
    return int(binary, 2)

# Function to hide a text file in the least significant bit of each pixel value
def hide_file(image, file_path):
    width, height = image.size
    pixel_values = list(image.getdata())
    try:
        with open(file_path, 'rb') as file:
            file_data = file.read()
    except IOError:
        raise IOError("File not found or cannot be read.")
    file_size = len(file_data)
    if file_size > width * height * 3 // 8:
        raise ValueError("File is too large to hide in the image.")
    encoded_pixels = []
    file_size_bin = byte_to_bin(file_size)
    for i, pixel in enumerate(pixel_values):
        if i < len(file_size_bin):
            # Change the least significant bit of the pixel value
            binary_pixel = bin(pixel[0])[2:].zfill(8)
            encoded_pixel = int(binary_pixel[:-1] + file_size_bin[i], 2)
            encoded_pixels.append((encoded_pixel, pixel[1], pixel[2]))
        else:
            if i - len(file_size_bin) < file_size:
                # Change the least significant bit of the pixel value
                binary_pixel = bin(pixel[0])[2:].zfill(8)
                encoded_pixel = int(binary_pixel[:-1] + byte_to_bin(file_data[i - len(file_size_bin)]), 2)
                encoded_pixels.append((encoded_pixel, pixel[1], pixel[2]))
            else:
                encoded_pixels.append(pixel)
    encoded_image = Image.new(image.mode, image.size)
    encoded_image.putdata(encoded_pixels)
    return encoded_image

# Function to extract a hidden text file from the least significant bit of each pixel value
def extract_file(image, file_path):
    pixel_values = list(image.getdata())
    extracted_file_data = []
    extracted_file_size_bin = ''
    for i, pixel in enumerate(pixel_values):
        binary_pixel = bin(pixel[0])[2:].zfill(8)
        if i < 8:
            extracted_file_size_bin += binary_pixel[-1]
        elif i < 8 + 8 * bin_to_byte(extracted_file_size_bin):
            extracted_file_data.append(bin_to_byte(binary_pixel[-1]))
    extracted_file_data = bytes(extracted_file_data)
    token=base64.b64decode(extracted_file_data).decode('uft-8')
    
    try:
        with open(file_path, 'w') as file:
            file.write(token)
    except IOError:
        raise IOError("Cannot write extracted file.")
    return

# Example usage
original_image = Image.open("UCD.png")

# Hide a text file in the image
text_file_path = "text_file.txt"
encoded_image = hide_file(original_image, text_file_path)
encoded_image.save("encoded_image.png")

# Extract the hidden text file from the image
decoded_image = Image.open("encoded_image.png")
extracted_text_file_path = "extracted_text_file.txt"
extract_file(decoded_image, extracted_text_file_path)

print("Text file extracted successfully.")