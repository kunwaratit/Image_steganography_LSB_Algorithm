import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EncryptedFilesList() {
  const [encryptedFiles, setEncryptedFiles] = useState([]);
  const userId = localStorage.getItem('id');
  console.log(userId);

  useEffect(() => {
    if (userId) {
      // Fetch encrypted files for the specific user based on the user ID
      axios.post(`http://127.0.0.1:8000/app/get_user_encrypted_files/`, {
        user_id: userId, // Send user ID in the request body
      })
        .then((response) => {
          setEncryptedFiles(response.data.encrypted_files);
        })
        .catch((error) => {
          console.error('Error fetching encrypted files:', error);
        });
    }
  }, [userId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Encrypted Files</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Filename</th>
            <th scope="col">File ID</th>
          </tr>
        </thead>
        <tbody>
          {encryptedFiles.map((file, index) => (
            <tr key={file.encrypted_file_id}>
              <th scope="row">{index + 1}</th>
              <td>{file.original_file_name}</td>
              <td>{file.encrypted_file_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EncryptedFilesList;
