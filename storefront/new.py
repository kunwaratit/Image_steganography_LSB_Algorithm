from PIL import Image

# Function to convert binary to text
def binary_to_text(binary):
    text = ''
    for i in range(0, len(binary), 8):
        byte = binary[i:i+8]
        text += chr(int(byte, 2))
    return text

# Function to extract hidden text from the least significant bit of each pixel value
def extract_text(image_path):
    image = Image.open(image_path)
    pixel_values = list(image.getdata())

    binary_text = ''
    for pixel in pixel_values:
        binary_pixel = [bin(channel)[2:].zfill(8) for channel in pixel[:3]]
        for i in range(3):
            binary_text += binary_pixel[i][-1]

    extracted_text = binary_to_text(binary_text)

    return extracted_text

# Example usage
encoded_image_path = "encoded_image.png"

# Extract the readable text from the encoded image
extracted_text = extract_text(encoded_image_path)

# Print the extracted text
print(extracted_text)
