import React, { useState } from 'react';
import axios from 'axios';
import DecodeImage from './DecodeImage';
import "../components/static/encrypt.css"

function EncodeImage() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEncode = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:8000/stego_app/encode/', formData)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='encrypt-container'><h2>Encode Image</h2>
      <h5>Choose text file:</h5>
      <input type="file"  onChange={handleFileChange} />
      <button onClick={handleEncode}>Encode</button>
      {response && (
        <div>
          <p>{response.message}</p>
          <img src={`http://localhost:8000/stego_app/${response.stego_image_path}`} alt="Stego Image" />
        </div>
      )}</div><div>
        <DecodeImage/>
      </div>
    </div>
  );
}

export default EncodeImage;
