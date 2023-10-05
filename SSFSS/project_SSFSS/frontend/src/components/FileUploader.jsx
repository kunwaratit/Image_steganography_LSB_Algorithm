import React, { useState } from 'react';
import axios from 'axios';

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // Ensure a file is selected
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Send the file to your Django API for encryption
      const response = await axios.post('http://localhost:8000/api/login/', formData);
      console.log('Encryption Key:', response.data.encryption_key);

      // TODO: Display the encryption key or copy it to the clipboard
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Encrypt</button>
    </div>
  );
}

export default FileUploader;
