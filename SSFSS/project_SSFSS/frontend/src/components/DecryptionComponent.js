import React, { useState } from 'react';
import "../components/static/decrypt.css"
function DecryptionComponent() {
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedFileId, setEncryptedFileId] = useState('');
  const [decryptedFile, setDecryptedFile] = useState(null);

  const handleDecrypt = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('encryption_key', encryptionKey);
      formData.append('encrypted_file_id', encryptedFileId);
      // Send a POST request to your Django backend to decrypt the file
      const response = await fetch('http://127.0.0.1:8000/app/decrypt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:formData.toString(),
      });
      

      if (!response.ok) {
        throw new Error('Decryption failed');
      }

      // Get the decrypted file from the response
      const blob = await response.blob();

      // Create a URL for the decrypted file
      const url = window.URL.createObjectURL(blob);

      // Set the decrypted file for download
      setDecryptedFile(url);
    } catch (error) {
      console.error('Error during decryption:', error);
    }
  };

  return (
    <div className='decrypt-container'>
      <h2 >Decryption</h2>
      <div>
        <label htmlFor="encryptionKey">Encryption Key:</label>
        <input
          type="text"
          name="encryption_key"
          id="encryptionKey"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="encryptedFileId">Encrypted File ID:</label>
        <input
          type="text"
          name="encrypted_file_id"
          id="encryptedFileId"
          value={encryptedFileId}
          onChange={(e) => setEncryptedFileId(e.target.value)}
          required
        />
      </div>
      <div>
        <button onClick={handleDecrypt}>Decrypt File</button>
      </div>
      {decryptedFile && (
        <div>
          <a href={decryptedFile} download={encryptedFileId+".txt"}>Download Decrypted File</a>
        </div>
      )}
    </div>
  );
}

export default DecryptionComponent;
