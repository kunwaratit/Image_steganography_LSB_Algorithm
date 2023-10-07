import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You may need to install axios if not already done
import './static/myfiles.css'
function EncryptedFilesList() {
  const [encryptedFiles, setEncryptedFiles] = useState([]);
  const userId = localStorage.getItem('id'); // Get user ID from local storage

  useEffect(() => {
    if (userId) {
      // Fetch encrypted files for the user
      axios.get(`http://127.0.0.1:8000/app/encrypted_files/`)
        .then((response) => {
          setEncryptedFiles(response.data.encrypted_files);
        })
        .catch((error) => {
          console.error('Error fetching encrypted files:', error);
        });
    }
  }, [userId]); // Run this effect when the userId changes

  return (
    <div className="container mt-4">
    <h2 className="mb-4">Encrypted Files</h2>
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Filename</th>
          <th scope="col">File ID</th>
          <th scope="col">Decrypt</th>
        </tr>
      </thead>
      <tbody>
        {encryptedFiles.map((file, index) => (
          <tr key={file.encrypted_file_id}>
            <th scope="row">{index + 1}</th>
            <td>{file.original_file_name}</td>
            <td>{file.encrypted_file_id}</td>
            <td>
              <a href='' download className="btn btn-primary">
                Decrypt
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default EncryptedFilesList;
