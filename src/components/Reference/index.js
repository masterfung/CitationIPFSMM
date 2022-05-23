// This is the citation page that takes in a CID parent, which then pulls in the data when user lands on this page

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { create } from "ipfs-http-client";
import toBuffer from "it-to-buffer";
import { Button } from "react-bootstrap";

const client = create("https://ipfs.infura.io:5001/api/v0");

const Reference = () => {
  const { cid } = useParams();
  const [file, setFile] = useState(null);
  const [selection, setSelection] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fileContents = await toBuffer(client.cat(cid));
      const res = Buffer.from(fileContents);
      setFile(res.toString());
    };
    fetchData();
  }, [cid]);

  const handleSubmission = () => {
    if (selection.length === 0) return;
    if (file.includes(selection)) {
      console.log("YAY!");
    }
  };

  return (
    <div>
      <h1>Create Citation</h1>
      <div>
        <p>The CID is: {cid} </p>
        <pre
          style={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            height: "300px",
            overflow: "scroll",
          }}
        >
          {file || "Loading..."}
        </pre>
        <div>
          <h5>Citation Selection</h5>
          <input
            type="text"
            onChange={(e) => setSelection(e.target.value)}
            onPaste={(e) => setSelection(e.target.value)}
            value={selection}
            placeholder="Citation Text Goes Here"
          />
          <Button onClick={handleSubmission} disabled={selection.length === 0}>
            Validate Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reference;
