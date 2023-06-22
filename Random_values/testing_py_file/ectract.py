from PIL import Image
from base64 import b64encode, b64decode
# Function to extract a readable text file from the least significant bit of each pixel value
def extract_text_from_image(image_path, output_file_path):
    image = Image.open(image_path)
    pixel_values = list(image.getdata())

    extracted_data = []
    file_size = 0
    for i, pixel in enumerate(pixel_values):
        if i < 8:
            file_size = (file_size << 1) | (pixel[0] & 1)
        elif i < (8 + file_size * 8):
            extracted_data.append(pixel[0] & 1)

    byte_data = bytearray()
    for i in range(0, len(extracted_data), 8):
        byte_value = 0
        for j in range(8):
            byte_value = (byte_value << 1) | extracted_data[i+j]
        byte_data.append(byte_value)
    
    with open(output_file_path, 'wb') as file:
        file.write(byte_data)


    print("Text file extracted successfully.")

# Example usage
encoded_image_path = "encoded_image.png"
output_file_path = "extracted_text_file.txt"

# Extract the readable text file from the encoded image
extract_text_from_image(encoded_image_path, output_file_path)
