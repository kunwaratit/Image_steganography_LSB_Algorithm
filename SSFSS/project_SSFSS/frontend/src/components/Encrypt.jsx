import React, { useState,useEffect } from "react";
import axios from "axios";
import "../components/static/encrypt.css"
import DecryptionComponent from './DecryptionComponent'
import {useNavigate  } from "react-router-dom";
//import FileUploader from './FileUploader';
import KeyDisplay from './KeyDisplay';
import { Navigate } from "react-router";

function FileUploadForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [encrypteddata, setEncrypteddata] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [encryptedFileid, setEncryptedFileid] = useState(null);
  const [isFileAvailable, setIsFileAvailable] = useState(false); // Define setIsFileAvailable

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEncrypt = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const userId = localStorage.getItem("user_id"); // Modify this to match your storage key

    // Append user ID to the form data
      formData.append("user_id", userId);

      // Upload the file and get the encryption key
      const response = await axios.post(
        "http://localhost:8000/app/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const {encrypted_file_id,encrypted_file,encrypted_data_hex, encryption_key} = response.data;
      setEncryptionKey(encryption_key);
      setEncrypteddata(encrypted_data_hex);
      setEncryptedFile(encrypted_file)
      setEncryptedFileid(encrypted_file_id)
    } catch (error) {
      console.error("Error:", error);
    }
  };  
/*
  const checkFileAvailability = async () => {
    if (encryptedFile) {
      try {
        const response = await axios.head(encryptedFile);
        setIsFileAvailable(response.status !== 404);
      } catch (error) {
        setIsFileAvailable(false);
      }
    }
  };

  useEffect(() => {
    checkFileAvailability();
  }, [encryptedFile]);
*/
  const handleCopyKey = () => {
    navigator.clipboard.writeText(encryptionKey);
  };
const handleStego=()=>{
  navigate("/Encode")
}
  return (
    <div className="container">
      <div className="encryption">
        <h2>Encryption</h2>
    <div className="encrypt-container">
        <h1>File Encryption App</h1>
      <form onSubmit={handleEncrypt}>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required />

          <hr/>
        <button type="submit">Encrypt</button>
      </form>
      {encryptionKey && (
        <div>
          <h2>Encryption Key:</h2>
         
          <p style={{color:'red',margin:'0px'}}>Note:copy the key and store safely </p><span>key and file id is sent to email</span>
          <input
            type="text"
            value={encryptionKey}
            readOnly
            disabled
          />
          <button onClick={handleCopyKey}>Copy Key</button>
        </div>
      )}
       {encryptedFile && (
        <div>
          <h2>Encrypted File:</h2>
          <div style={{}}>Decoded Text:<p> {encrypteddata}</p></div>
            <a href={encryptedFile} download={encryptedFileid+".enc"}>
              Download
            </a>
          
        </div>
      )}

    </div>

<DecryptionComponent />
</div>
        <button onClick={handleStego}>implement Stego</button>
    </div>
    
  );
}



 /* const [file, setFile] = useState(null);
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
*/
export default FileUploadForm;
