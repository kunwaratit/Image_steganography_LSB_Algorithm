import React, { Component } from 'react';
import Decryptor from './Decryptor'; // Import the Decryptor function
import "../components/static/decrypt.css"

class DecryptFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encryption_Key: '',
      encrypted_File_Id: '',
      decryptedData: null,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { encryption_Key, encrypted_File_Id } = this.state;
    if (!encryption_Key || !encrypted_File_Id) {
      console.error('encryptionKey or encryptedFileId is missing');
      return;
    }
    try {
      // Use the Decryptor function to decrypt the file
      const decryptedData = await Decryptor(encryption_Key, encrypted_File_Id);

      // Handle the decrypted data as needed
      this.setState({ decryptedData });
    } catch (error) {
      console.error('Error during decryption:', error);
    }
  };

  render() {
    const { encryption_Key, encrypted_File_Id, decryptedData } = this.state;

    return (
      <div className='decrypt-container'>
        <h2>Decrypt File</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Encryption Key:
            <input
              type="text"
              name="encryption_Key"
              value={encryption_Key}
              onChange={this.handleInputChange}
              
            />
          </label>
          <label>
            Encrypted File ID:
            <input
              type="text"
              name="encrypted_File_Id"
              value={encrypted_File_Id}
              onChange={this.handleInputChange}
              
            />
          </label>
          <button type="submit">Decrypt</button>
        </form>
        {decryptedData && (
          <div>
            <h3>Decrypted Data:</h3>
            <pre>{JSON.stringify(decryptedData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default DecryptFile;
