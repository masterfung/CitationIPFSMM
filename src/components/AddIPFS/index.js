import React, { useState } from "react";
import { TextUpload } from "react-ipfs-uploader";

const AddIPFS = () => {
  const [textUrl, setTextUrl] = useState("");
  const [title, setTitle] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const split = textUrl.split("/");
    const CID = split[split.length - 1];
    if (title.length > 0) {
      console.log("submit submission to firebase");
      console.log("the CID of the parent submission", CID);
    }
  };

  return (
    <div>
      <div>
        <TextUpload setUrl={setTextUrl} />
        TextUrl :{" "}
        <a href={textUrl} target="_blank" rel="noopener noreferrer">
          {textUrl}
        </a>
      </div>
      <div>
        <h3>Title of Article</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
        />
      </div>
      <div>
        <button
          onClick={(event) => submitForm(event)}
          disabled={textUrl.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddIPFS;
