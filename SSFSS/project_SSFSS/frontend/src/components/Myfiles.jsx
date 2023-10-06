import React, { useState, useEffect } from "react";
import axios from "axios";

function Myfiles() {
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    // Make an API request to fetch the user's files
    axios.get("http://localhost:8000/app/user-files")
      .then((response) => {
        // Assuming the response data is an array of user files
        setUserFiles(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <h1>My Files</h1>
      <ul>
        {userFiles.map((file) => (
          <li key={file.id}>
            <a href={file.url} download>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Myfiles;
