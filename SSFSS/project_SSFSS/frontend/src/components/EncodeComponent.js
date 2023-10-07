import React, { useState } from 'react';
import axios from 'axios';
import "../components/static/encode.css"

function EncodeComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEncode = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8000/stego_app/encode/', formData)
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a success message or update the UI
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., display an error message
      });
  };

  return (
    <div className="encode-container">
      <h2>Encode File into Image</h2>
      <br/>
      <input type="file" onChange={handleFileChange} />
      <hr/>
      <button onClick={handleEncode}>Encode</button>
    </div>
  );
}

export default EncodeComponent;
