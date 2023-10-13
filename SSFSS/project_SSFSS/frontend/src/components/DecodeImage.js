import React, { useState } from 'react';
import axios from 'axios';
import "../components/static/encrypt.css"
function DecodeImage() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDecode = () => {
    const formData = new FormData();
    formData.append('image_file', file);

    axios
      .post('http://localhost:8000/stego_app/decode/', formData)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="encrypt-container">
      <h2>Decode Image</h2><h5>Choose Stego_image</h5>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleDecode}>Decode</button>
      {response && (
        <div>
          <p>{response.message}</p>
          <p>Decoded Text: {response.decoded_text}</p>
        </div>
      )}
    </div>
  );
}

export default DecodeImage;
