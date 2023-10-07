import React, { useState } from 'react';
import axios from 'axios';

function DecodeComponent() {
  const handleDecode = () => {
    axios.post('http://localhost:8000/stego_app/decode/')
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., display the decoded text
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., display an error message
      });
  };

  return (
    <div>
      <h2>Decode Text from Image</h2>
      <button onClick={handleDecode}>Decode</button>
    </div>
  );
}

export default DecodeComponent;
