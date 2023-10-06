import React, { useState, useEffect } from "react";
import axios from "axios";

function Decryptor() {
  const [decryptionKey, setDecryptionKey] = useState("");
  const [decryptedFile, setDecryptedFile] = useState("");
  const [decryptedFileName, setDecryptedFileName] = useState("");

  const handleKeyChange = (e) => {
    setDecryptionKey(e.target.value);
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();

    // Make an API request to decrypt the file
    try {
      const response = await axios.post(
        "http://localhost:8000/app/decrypt/",
        {
          encryption_key: decryptionKey,
          encrypted_file_id: "your_encrypted_file_id_here", // Replace with the actual encrypted file ID
        }
      );

      // Handle the decrypted file response here
      // You may save it to state or display it as needed
      const { data, headers } = response;
      const fileName = headers["content-disposition"].split("filename=")[1];

      setDecryptedFile(data);
      setDecryptedFileName(fileName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownloadDecryptedFile = () => {
    // Create a Blob object for the decrypted file data
    const blob = new Blob([decryptedFile]);

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link for downloading the file
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = decryptedFileName;
    downloadLink.style.display = "none";

    // Trigger a click event to start the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Revoke the Blob URL to free up resources
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>File Decryption App</h1>
      <form onSubmit={handleDecrypt}>
        <input
          type="text"
          placeholder="Enter decryption key"
          value={decryptionKey}
          onChange={handleKeyChange}
          required
        />
        <button type="submit">Decrypt</button>
      </form>
      {decryptedFile && (
        <div>
          <h2>Decrypted File:</h2>
          <p>{decryptedFileName}</p>
          <button onClick={handleDownloadDecryptedFile}>Download Decrypted File</button>
        </div>
      )}
    </div>
  );
}

export default Decryptor;
