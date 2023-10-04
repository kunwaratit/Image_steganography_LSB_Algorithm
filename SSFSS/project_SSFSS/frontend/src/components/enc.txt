import React from "react";
import './static/encrypt.css'
function Encrypt(){
    return(<section className="upload-section">
    <h1>Encrypter</h1>
    <form
      className="upload-form"
      action="#"
      method="post"
      encType="multipart/form-data"
    >
      {"{"}% csrf_token %{"}"}
      <input
        type="checkbox"
        name="encrypt"
        id="encrypt"
        onclick="encryptfile()"
      />
      Generate Key
      <input type="checkbox" name="stego" id="stego" onclick="stegofile()" />{" "}
      Stegnography
      <input
        type="text"
        name="key"
        id="encryption-key"
        defaultValue="{{keyvalue}}"
        placeholder="encryption-key"
        disabled=""
      />
      <p>
        <i style={{ fontWeight: "lighter" }}>
          key is imp to decrypt so donot loose.
        </i>
      </p>
      <input type="file" name="document" id="file" />
      <input type="text" name="key" id="file" placeholder="Message" />
      <br />
      <div id="setgoimage" style={{ visibility: "hidden" }}>
        Upload Cover File <input type="file" name="file" id="file" />
      </div>
      <button type="submit" onclick="location.href='{% url 'encdec' %}'">
        Encrypt
      </button>
      {/* <button type="submit">Encrypt</button>
       */}
    </form>
  </section>
  )
}export default Encrypt;
