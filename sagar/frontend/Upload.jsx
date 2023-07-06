import React from "react";

const Upload = () => {
  return (
    <div className="form-container">
      <h1>Encrypter</h1>
      <form>
        <input type="checkbox" name="encryption" id="encryption" />
        Generate key
        <input type="checkbox" name="stegno" id="stegno" />
        Stegnography
        <input
          type="text"
          name="key"
          id="encryption-key"
          value=""
          placeholder="Key"
          disabled
        />
        <p>key is important to decrypt so donot loose.</p>
        <input type="file" name="file" id="file" />
        <input type="text" name="key" id="file" placeholder="Message" />
        <p>Upload Cover File</p>
        <input type="file" name="file" id="file" />
        <button type="submit"> Encrypt </button>
      </form>
    </div>
  );
};

export default Upload;
