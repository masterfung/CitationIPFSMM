import React, { useState } from "react";
import { TextUpload } from "react-ipfs-uploader";

const AddIPFS = () => {
  const [textUrl, setTextUrl] = useState("");

  return (
    <div>
      <TextUpload setUrl={setTextUrl} />
      TextUrl :{" "}
      <a href={textUrl} target="_blank" rel="noopener noreferrer">
        {textUrl}
      </a>
    </div>
  );
};

export default AddIPFS;
