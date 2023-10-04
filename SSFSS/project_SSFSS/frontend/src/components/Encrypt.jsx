import React, { useState } from "react";
import axios from "axios";

function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [encryptedFile, setEncryptedFile] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEncryptionKeyChange = (e) => {
    setEncryptionKey(e.target.value);
  };

  const handleEncrypt = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Get the encryption key from your Django API
     // const response = await axios.get("http://localhost:8000/app/upload");
     // const { encryption_key } = response.data;

      // Set the encryption key
     // setEncryptionKey(encryption_key);

      // Encrypt the file
      const encryptedResponse = await axios.post(
        "http://localhost:8000/app/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { encrypted_file, encryption_key } = encryptedResponse.data;
      setEncryptedFile(encrypted_file);
      console.log("Encryption Key:", encryption_key);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>File Encryption App</h1>
      <form onSubmit={handleEncrypt}>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
        />
  
        <button type="submit">Encrypt</button>
      </form>
      {encryptedFile && (
        <div>
          <h2>Encrypted File:</h2>
          <a href={encryptedFile} download>
            Download
          </a>
        </div>
      )}
    </div>
  );
}

export default FileUploadForm;
