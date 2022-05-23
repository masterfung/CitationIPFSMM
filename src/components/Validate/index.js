// This component is used to render the validity of the citation. 
// The hash generated from the citation will be the hash param used

import { useParams } from "react-router-dom";

const Validate = () => {
  const { hash } = useParams();
  return (
    <div>
      <h1>Citation Validation</h1>
      <p>Hash: {hash}</p>
    </div>
  );
};

export default Validate;
